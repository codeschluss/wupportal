import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';
import { Box, MetatagService, PlatformProvider, TokenProvider, UserProvider } from '../../../../core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.sass', 'login.page.sass'],
  templateUrl: 'login.page.html'
})

export class LoginPageComponent
  extends BasePage
  implements OnInit, AfterViewInit {

  public email: FormControl = new FormControl(null, [
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    Validators.required
  ]);

  public password: FormControl = new FormControl(null, [
    // Validators.minLength(8),
    // Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
    // Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
    // Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/),
    Validators.required
  ]);

  protected path: string = 'login';

  @ViewChildren(MatInput)
  private inputs: QueryList<MatInput>;

  public get disabled(): boolean {
    return this.platformProvider.name === 'server'
      || /MSIE|Trident/.test(this.platformProvider.userAgent);
  }

  public get name(): Observable<string> {
    return this.metatagService.name;
  }

  public get registerable(): boolean {
    return !this.disabled
      && !this.email.value
      && !this.password.value;
  }

  public get resetable(): boolean {
    return !this.disabled
      && this.email.valid
      && !this.password.value;
  }

  public get valid(): boolean {
    return !this.disabled
      && this.email.valid
      && this.password.valid;
  }

  public constructor(
    private metatagService: MetatagService,
    private platformProvider: PlatformProvider,
    private router: Router,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    if (this.disabled) {
      this.email.disable();
      this.password.disable();
    } else {
      this.tokenProvider.value.pipe(
        take(1),
        map((tokens) => tokens.access.id),
        filter(Boolean)
      ).subscribe((id) => this.router.navigate(['/', 'admin', 'account', id]));
    }
  }

  public ngAfterViewInit(): void {
    if (!this.disabled) {
      this.inputs.first.focus();
    }
  }

  public login(): void {
    this.tokenProvider.login(this.email.value, this.password.value).pipe(
      map((tokens) => tokens.access.id),
      catchError(() => {
        this.inputs.last.focus();
        this.password.patchValue(null);
        return EMPTY;
      })
    ).subscribe((id) => this.router.navigate(['/', 'admin', 'account', id]));
  }

  public reset(event: Event): void {
    this.userProvider.resetPassword(Box(this.email.value)).pipe(
      catchError(() => {
        this.email.patchValue(null);
        return EMPTY;
      })
    ).subscribe(() => {
      (event.target as HTMLButtonElement).disabled = true;
      this.inputs.last.focus();
      this.password.reset();
    });
  }

}
