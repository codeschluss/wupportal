import { Component, HostBinding, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { ContentView } from 'tns-core-modules/ui/content-view';
import { IconComponent as Compat } from './icon.component.i';

if (!isKnownView('icon-component')) {
  registerElement('icon-component', () => ContentView);
}

@Component({
  selector: 'icon-component',
  styles: [`
    Label {
      horizontal-align: center;
      vertical-align: center;
    }
  `],
  template: `
    <Label [class]="pack" [text]="text"></Label>
  `
})

export class IconComponent implements Compat {

  @HostBinding('attr.component')
  public readonly component: string = 'icon';

  @Input()
  public icon: string;

  @Input()
  public pack: string = 'fas';

  public get text(): string {
    return String.fromCodePoint(parseInt(this.iconLibrary.getIconDefinition(
      this.pack as any,
      this.icon as any
    ).icon[3], 16));
  }

  public constructor(
    private iconLibrary: FaIconLibrary
  ) { }

}
