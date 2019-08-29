import { Component, ContentChild, ElementRef, HostBinding, TemplateRef, ViewChild } from '@angular/core';
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

export class ExpandCompatComponent implements ExpandCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'expand';

  @ContentChild('expandContent', { static: true })
  public content: TemplateRef<any>;

  @ContentChild('expandHeader', { static: true })
  public header: TemplateRef<any>;

  @ViewChild('MatExpansionPanel', { static: true })
  public instance: ElementRef<ContentView>;

  private state: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get visible(): Observable<boolean> {
    return this.state.asObservable();
  }

  public expanded(state: boolean): void {
    this.state.next(state);
  }

  public hide(): void {
    this.state.next(false);
  }

  public show(): void {
    this.state.next(true);
  }

  public toggle(): void {
    this.state.next(!this.state.value);
  }

}
