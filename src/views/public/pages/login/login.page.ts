import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title, TokenProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'login.page.scss'],
  templateUrl: 'login.page.html'
})

export class LoginPageComponent extends BasePage implements OnInit {

  public password: FormControl = new FormControl(null, [
    // Validators.minLength(8),
    // Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
    // Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
    // Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/),
    Validators.required
  ]);

  public username: FormControl = new FormControl(null, [
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    Validators.required
  ]);

  protected path: string = 'login';

  public get name(): Observable<string> {
    return this.titleService.name;
  }

  public get valid(): boolean {
    return true
      && this.password.valid
      && this.username.valid;
  }

  public constructor(
    private router: Router,
    private titleService: Title,
    private tokenProvider: TokenProvider
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
    this.tokenProvider.login(this.username.value, this.password.value).pipe(
      map((tokens) => tokens.access.id),
      catchError(() => {
        this.password.patchValue(null);
        this.username.patchValue(null);
        return EMPTY;
      })
    ).subscribe((id) => this.router.navigate(['/', 'admin', 'account', id]));
  }

}
