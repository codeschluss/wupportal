import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LabelResolver } from './label.resolver';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'i18n',
  template: `
    <slot #wrapper><ng-content></ng-content></slot>
  `
})

export class LabelComponent
  implements AfterViewInit {

  public text: string;

  @ViewChild('wrapper', { read: ElementRef, static: true })
  private wrapper: ElementRef<HTMLElement>;

  public constructor(
    private labelResolver: LabelResolver
  ) {

  }

  public ngAfterViewInit(): void {
    this.text = this.wrapper.nativeElement.innerHTML;
    this.text = this.labelResolver.lookup(this.text);
    this.wrapper.nativeElement.innerHTML = this.text;
  }

}
