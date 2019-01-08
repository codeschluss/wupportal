import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { TokenProvider } from '@portal/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  styles: [`
    mat-form-field { display: block; }
  `],
  template: `
    <h1 mat-dialog-title>
      <i18n i18n="@@authenticationExpired">authenticationExpired</i18n>
    </h1>
    <section mat-dialog-content>
      <mat-form-field>
        <mat-label><i18n i18n="username">username</i18n></mat-label>
        <input matInput [formControl]="username">
      </mat-form-field>
      <mat-form-field>
        <mat-label><i18n i18n="password">password</i18n></mat-label>
        <input matInput type="password" [formControl]="password">
      </mat-form-field>
    </section>
    <section mat-dialog-actions>
      <button mat-button tabindex="-1" (click)="logout()">
        <i18n i18n="@@logout">logout</i18n>
      </button>
      <button mat-button color="primary" [disabled]="!valid" (click)="login()">
        <i18n i18n="@@login">login</i18n>
      </button>
    </section>
  `
})

export class ReloginDialogComponent implements OnInit {

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

  public get valid(): boolean {
    return this.password.valid && this.username.valid;
  }

  public constructor(
    private dialogRef: MatDialogRef<ReloginDialogComponent>,
    private router: Router,
    private tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  public login(): void {
    this.tokenProvider.login(this.username.value, this.password.value).pipe(
      catchError(() => {
        this.password.patchValue(null);
        this.username.patchValue(null);
        return of();
      })
    ).subscribe(() => this.dialogRef.close(true));
  }

  public logout(): void {
    this.router.navigateByUrl('/').then(() => this.dialogRef.close(false));
  }

}
