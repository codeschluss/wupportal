import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenProvider } from '../../../core';

@Component({
  styles: [`
    mat-form-field { display: block; }
  `],
  template: `
    <h2 mat-dialog-title>
      <i18n>authenticationExpired</i18n>
    </h2>
    <section mat-dialog-content>
      <mat-form-field>
        <mat-label><i18n>email</i18n></mat-label>
        <input matInput
          type="email"
          [formControl]="email"
          (keydown.enter)="valid && login()">
      </mat-form-field>
      <mat-form-field>
        <mat-label><i18n>password</i18n></mat-label>
        <input matInput
          type="password"
          [formControl]="password"
          (keydown.enter)="valid && login()">
      </mat-form-field>
    </section>
    <section mat-dialog-actions>
      <button mat-stroked-button [disabled]="!valid" (click)="login()">
        <i18n>login</i18n>
      </button>
      <button mat-stroked-button (click)="logout()">
        <i18n>logout</i18n>
      </button>
    </section>
  `
})

export class ReloginPopupComponent
  implements OnInit {

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

  public get valid(): boolean {
    return this.email.valid && this.password.valid;
  }

  public constructor(
    private dialogRef: MatDialogRef<ReloginPopupComponent>,
    private router: Router,
    private tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  public login(): void {
    this.tokenProvider.login(this.email.value, this.password.value).pipe(
      catchError(() => {
        this.email.patchValue(null);
        this.password.patchValue(null);
        return EMPTY;
      })
    ).subscribe(() => this.dialogRef.close(true));
  }

  public logout(): void {
    this.router.navigate(['/']).then(() => this.dialogRef.close(false));
  }

}
