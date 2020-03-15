import { Component, ContentChild, EventEmitter, HostBinding, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentView } from 'tns-core-modules/ui/content-view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { ExpandComponent as Compat } from './expand.component.i';

if (!isKnownView('expand-component')) {
  registerElement('expand-component', () => ContentView);
}

@Component({
  selector: 'expand-component',
  styleUrls: ['expand.component.scss'],
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

export class ExpandComponent implements Compat, OnInit {

  @Output()
  public changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('attr.component')
  public readonly component: string = 'expand';

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
