import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { DEFAULT_BREAKPOINTS, FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatDividerModule } from '@angular/material';

@Component({
  selector: 'nesting-component',
  styles: [
    ':host { display: block; margin: 0 auto; }',
    'mat-card { background-color: rgba(255, 255, 255, .93); }',
    'mat-card-actions { text-align: right; }'
  ],
  template: `
    <mat-card>
      <mat-card-content [fxLayout]="flow" [fxLayoutAlign]="flex">
        <ng-container [ngTemplateOutlet]="content"></ng-container>
      </mat-card-content>
      <mat-divider *ngIf="actions"></mat-divider>
      <mat-card-actions *ngIf="actions">
        <ng-container [ngTemplateOutlet]="actions"></ng-container>
      </mat-card-actions>
    </mat-card>
  `
})

export class NestingComponent implements OnInit {

  public static readonly imports = [
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule
  ];

  @ContentChild('actions')
  public actions: TemplateRef<any>;

  @ContentChild('content')
  public content: TemplateRef<any>;

  @Input()
  public flex: string;

  @Input()
  public flow: string;

  @Input()
  public size: string;

  public constructor(
    private host: ElementRef
  ) { }

  public ngOnInit(): void {
    const breakpoint = DEFAULT_BREAKPOINTS.find((i) => i.alias === this.size);

    if (breakpoint) {
      this.host.nativeElement.style.cssText =
        breakpoint.mediaQuery.match('max-width: [0-9]+px').pop();
    }
  }

}
