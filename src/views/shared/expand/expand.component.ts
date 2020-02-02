import { Component, ContentChild, EventEmitter, HostBinding, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExpandComponent as Compat } from './expand.component.i';

@Component({
  selector: 'expand-component',
  styleUrls: ['expand.component.scss'],
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

export class ExpandComponent implements Compat, OnInit {

  @Output()
  public changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('attr.component')
  public readonly component: string = 'expand';

  @ContentChild('expandContent', { static: true })
  public content: TemplateRef<any>;

  @ContentChild('expandHeader', { static: true })
  public header: TemplateRef<any>;

  @ViewChild(MatExpansionPanel, { static: true })
  public instance: MatExpansionPanel;

  private state: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
