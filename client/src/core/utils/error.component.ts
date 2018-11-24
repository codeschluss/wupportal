import { Component, Inject } from '@angular/core';
import { MatButtonModule, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorModel } from './error.model';

@Component({
  template: `
    <h1 mat-dialog-title>
      <!-- <i18n i18n="@@unhandledError">unhandledError</i18n>: -->
      Unhandled Error:
      <!-- <?i18n> -->
      {{ error.error }}
    </h1>
    <div mat-dialog-content>
      <pre><strong>Status:</strong><br>{{ error.status }}</pre>
      <pre><strong>Resource:</strong><br>{{ error.path }}</pre>
      <pre><strong>Timestamp:</strong><br>{{ error.timestamp }}</pre>
      <pre><strong>Stacktrace:</strong><br>{{ stacktrace }}</pre>
      <pre><strong>Exception:</strong><br>{{ error.message }}</pre>
    </div>
    <div mat-dialog-actions>
      <a mat-button href="{{ issueUrl }}" target="_blank">
        <!-- <i18n i18n="@@reportIssue">reportIssue</i18n> -->
        Report Issue
        <!-- <?i18n> -->
      </a>
      <button mat-button mat-dialog-close>
        <!-- <i18n i18n="@@close">close</i18n> -->
        Close
        <!-- <?i18n> -->
      </button>
    </div>
  `,
  styles: [
    'h1 { color: red; }'
  ]
})

export class ClientErrorComponent {

  public static readonly imports = [
    MatButtonModule
  ];

  public issueUrl: string = require('../../../package.json').bugs.url;

  public stacktrace: string = new Error().stack;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public error: ErrorModel
  ) { }

}
