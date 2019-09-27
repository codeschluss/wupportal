import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Box, Title, TokenProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';
import { UserProvider } from '../../../../realm/providers/user.provider';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'login.page.scss'],
  templateUrl: 'login.page.html'
})

export class LoginPageComponent extends BasePage implements OnInit {

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

  @ViewChild('input', { read: ElementRef, static: true })
  private input: ElementRef<HTMLElement>;

  public get name(): Observable<string> {
    return this.titleService.name;
  }

  public get valid(): boolean {
    return true
      && this.email.valid
      && this.password.valid;
  }

  public constructor(
    private router: Router,
    private titleService: Title,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    this.tokenProvider.value.pipe(
      take(1),
      map((tokens) => tokens.access.id),
      filter(Boolean)
    ).subscribe((id) => this.router.navigate(['/', 'admin', 'account', id]));
  }

  public login(): void {
    this.tokenProvider.login(this.email.value, this.password.value).pipe(
      map((tokens) => tokens.access.id),
      catchError(() => {
        this.input.nativeElement.focus();
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
      this.input.nativeElement.focus();
      this.password.reset();
    });
  }

}
