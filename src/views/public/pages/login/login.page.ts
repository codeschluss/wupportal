import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenProvider } from '@wooportal/core';
import { EMPTY } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ClientPackage } from '../../../../utils/package';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'login.page.scss'],
  templateUrl: 'login.page.html'
})

export class LoginPageComponent extends BasePage implements OnInit {

  public password: FormControl = new FormControl(null, [
    // Validators.minLength(10),
    // Validators.pattern(/(?=(?:[^0-9]*[0-9]){2})/),
    // Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){2})/),
    // Validators.pattern(/(?=(?:[^a-z]*[a-z]){2})/),
    Validators.required
  ]);

  public username: FormControl = new FormControl(null, [
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    Validators.required
  ]);

  protected path: string = 'login';

  public get title(): string {
    return ClientPackage.config.defaults.title;
  }

  public get valid(): boolean {
    return this.password.valid && this.username.valid;
  }

  public constructor(
    private router: Router,
    private tokenProvider: TokenProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    this.tokenProvider.value.pipe(take(1)).subscribe((tokens) =>
      tokens.access.id && this.router.navigate(['/', 'admin', 'account']));
  }

  public login(): void {
    this.tokenProvider.login(this.username.value, this.password.value).pipe(
      catchError(() => {
        this.password.patchValue(null);
        this.username.patchValue(null);
        return EMPTY;
      })
    ).subscribe(() => this.router.navigate(['/', 'admin', 'account']));
  }

}
