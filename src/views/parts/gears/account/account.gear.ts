import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, mergeMap, Observable, of } from 'rxjs';
import { CrudJoiner, CrudResolver, TokenProvider, UserModel, UserProvider } from '../../../../core';

@Component({
  selector: 'account-gear',
  styleUrls: ['account.gear.sass'],
  templateUrl: 'account.gear.html'
})

export class AccountGearComponent
  implements OnInit {

  public account: Observable<UserModel>;

  public formGroup: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl(null, [
      // Validators.minLength(8),
      // Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
      // Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
      // Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/),
      Validators.required
    ])
  });

  public constructor(
    private crudResolver: CrudResolver,
    private router: Router,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider
  ) { }

  public ngOnInit(): void {
    const joiner = CrudJoiner.of(UserModel)
      .with('avatar');

    this.account = this.tokenProvider.value.pipe(mergeMap((tokens) => {
      if (tokens.access.id) {
        return this.userProvider.readOne(tokens.access.id).pipe(
          mergeMap((items) => this.crudResolver.refine(items, joiner.graph)),
          catchError(() => of(null))
        ) as Observable<UserModel>;
      }
      return of(null)
    }));
  }

  public login(): void {
    if (this.formGroup.valid && !this.formGroup.pending) {
      this.formGroup.markAsPending();

      this.tokenProvider.login(
        this.formGroup.get('username').value,
        this.formGroup.get('password').value
      ).pipe(
        map((tokens) => tokens.access.id),
        catchError(() => {
          this.formGroup.get('password').patchValue(null);
          this.formGroup.get('password').markAsTouched();
          return EMPTY;
        })
      ).subscribe((id) => {
        this.formGroup.reset();
        this.router.navigate(['/', 'admin', 'account', id])
      });
    }
  }

  public logout(): void {
    this.tokenProvider.remove();
  }

}
