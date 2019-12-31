import { Component, HostBinding, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { ContentView } from 'tns-core-modules/ui/page';
import { IconCompat } from './icon.compat.i';

if (!isKnownView('icon-compat')) {
  registerElement('icon-compat', () => ContentView);
}

@Component({
  selector: 'icon-compat',
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

export class IconCompatComponent implements IconCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'icon';

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
