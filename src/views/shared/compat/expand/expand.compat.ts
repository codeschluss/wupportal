import { Component, ContentChild, EventEmitter, HostBinding, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExpandCompat } from './expand.compat.i';

@Component({
  selector: 'expand-compat',
  template: `
    <mat-expansion-panel
      (closed)="update(false)"
      (opened)="update(true)">
      <mat-expansion-panel-header>
        <mat-panel-title>
          <ng-container *ngTemplateOutlet="header"></ng-container>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </mat-expansion-panel>
  `
})

export class ExpandCompatComponent implements ExpandCompat, OnInit {

  @Output()
  public changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('attr.compat')
  public readonly compat: string = 'expand';

  @ContentChild('expandContent', { static: true })
  public content: TemplateRef<any>;

  @ContentChild('expandHeader', { static: true })
  public header: TemplateRef<any>;

  @ViewChild(MatExpansionPanel, { static: true })
  public instance: MatExpansionPanel;

  private state: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get expanded(): Observable<boolean> {
    return this.state.asObservable();
  }

  public ngOnInit(): void {
    this.state.subscribe((state) => this.changed.emit(state));
  }

  public close(): void {
    this.instance.close();
  }

  public open(): void {
    this.instance.open();
  }

  public toggle(): void {
    this.instance.toggle();
  }

  public update(state: boolean): void {
    this.state.next(state);
  }

}
