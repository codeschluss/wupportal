import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CorePackage } from '../utils/package';

@Component({
  template: `
    <h1 mat-dialog-title>
      Unhandled Error: {{ data.error.error }}
    </h1>
    <div mat-dialog-content>
      <pre><strong>Status:</strong><br>{{ data.error.status }}</pre>
      <pre><strong>Resource:</strong><br>{{ data.error.path }}</pre>
      <pre><strong>Timestamp:</strong><br>{{ data.error.timestamp }}</pre>
      <pre><strong>Stacktrace:</strong><br>{{ data.stacktrace }}</pre>
      <pre><strong>Exception:</strong><br>{{ data.error.message }}</pre>
    </div>
    <div mat-dialog-actions>
      <a mat-button href="{{ corePackage.bugs.url }}" target="_blank">
        Report Issue
      </a>
      <button mat-button mat-dialog-close>
        Close
      </button>
    </div>
  `,
  styles: [
    'h1 { color: red; }'
  ]
})

export class ErrorDialogComponent {

  public constructor(
    public corePackage: CorePackage,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

}
