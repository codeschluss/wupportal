import { Component, ContentChild, HostBinding, TemplateRef, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExpandCompat } from './expand.compat.i';

@Component({
  selector: 'expand-compat',
  template: `
    <mat-expansion-panel
      (closed)="expanded(false)"
      (opened)="expanded(true)">
      <mat-expansion-panel-header>
        <mat-panel-title>
          <ng-container *ngTemplateOutlet="header"></ng-container>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </mat-expansion-panel>
  `
})

export class ExpandCompatComponent implements ExpandCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'expand';

  @ContentChild('expandContent', { static: true })
  public content: TemplateRef<any>;

  @ContentChild('expandHeader', { static: true })
  public header: TemplateRef<any>;

  @ViewChild(MatExpansionPanel, { static: true })
  public instance: MatExpansionPanel;

  private state: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get visible(): Observable<boolean> {
    return this.state.asObservable();
  }

  public expanded(state: boolean): void {
    this.state.next(state);
  }

  public hide(): void {
    this.instance.close();
  }

  public show(): void {
    this.instance.open();
  }

  public toggle(): void {
    this.instance.toggle();
  }

}
