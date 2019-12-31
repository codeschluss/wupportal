import { Component, ContentChild, EventEmitter, HostBinding, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { BehaviorSubject, Observable } from 'rxjs';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { ContentView } from 'tns-core-modules/ui/page';
import { ExpandCompat } from './expand.compat.i';

if (!isKnownView('expand-compat')) {
  registerElement('expand-compat', () => ContentView);
}

@Component({
  selector: 'expand-compat',
  styleUrls: ['expand.compat.scss'],
  template: `
    <StackLayout #expand class="expand" [ngClass]="{
      closed: (expanded | async) === false,
      opened: (expanded | async) === true
    }">
      <FlexboxLayout (tap)="toggle()">
        <ng-container *ngTemplateOutlet="header"></ng-container>
        <StackLayout flexGrow="1"></StackLayout>
        <GridLayout class="indicator">
          <GridLayout></GridLayout>
        </GridLayout>
      </FlexboxLayout>
      <StackLayout>
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </StackLayout>
    </StackLayout>
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

  @ViewChild('expand', { static: true })
  public instance: StackLayout;

  private state: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get expanded(): Observable<boolean> {
    return this.state.asObservable();
  }

  public ngOnInit(): void {
    this.state.subscribe((state) => this.changed.emit(state));
  }

  public close(): void {
    this.state.next(false);
  }

  public open(): void {
    this.state.next(true);
  }

  public toggle(): void {
    this.state.next(!this.state.value);
  }

}
