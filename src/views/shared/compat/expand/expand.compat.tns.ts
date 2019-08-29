import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentView } from 'tns-core-modules/ui/page';
import { ExpandCompat } from './expand.compat.i';

if (!isKnownView('drawer-compat')) {
  registerElement('drawer-compat', () => ContentView);
}

@Component({
  selector: 'expand-compat',
  template: ``
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

  @ViewChild('MatExpansionPanel', { static: true })
  public instance: ElementRef<ContentView>;

  private state: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

  public update(state: boolean): void {
    this.state.next(state);
  }

}
