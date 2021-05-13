import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedbackProvider } from '../../../../core';

@Component({
  styleUrls: ['fatal.popup.sass'],
  templateUrl: 'fatal.popup.html'
})

export class FatalPopupComponent {

  public content: FormControl = new FormControl(null, [
    Validators.required
  ]);

  public email: FormControl = new FormControl(null, [
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    Validators.required
  ]);

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private feedbackProvider: FeedbackProvider,
    private dialogRef: MatDialogRef<FatalPopupComponent>
  ) { }

  public send(): void {
    this.feedbackProvider.create({
      senderMail: this.email.value,
      text: `\n`
        + `From:\n${this.email.value}\n\n`
        + `Comment:\n${this.content.value}\n\n`
        + `Time:\n${this.data.timestamp}\n\n`
        + `Error:\n${this.data.error}\n\n`
        + `Status:\n${this.data.status}\n\n`
        + `Resource:\n${this.data.path}\n\n`
        + `Useragent:\n${this.data.userAgent}\n\n`
        + `Exception:\n${this.data.message}\n\n`
        + `Stacktrace:\n${this.data.trace}\n\n`
    }).subscribe(() => this.dialogRef.close());
  }

}
