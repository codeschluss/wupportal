import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { fromData, ImageSourceSVG } from '@teammaestro/nativescript-svg';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { ContentView } from 'tns-core-modules/ui/page/page';
import { IconCompat as Compat } from './icon.compat.d';

if (!isKnownView('icon-compat')) {
  registerElement('icon-compat', () => ContentView);
}

@Component({
  selector: 'icon-compat',
  template: `<SVGImage [imageSource]="src"></SVGImage>`
})

export class IconCompat extends ContentView
  implements Compat, OnInit, OnChanges {

  @Input()
  public name: string;

  public src: ImageSourceSVG;

  public ngOnInit(): void {
      this.src = this.getIcon(this.name);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.name) {
      this.src = this.getIcon(this.name);
    }
  }

  private getIcon(name: string): ImageSourceSVG {
    return fromData(icon({
      iconName: name as any,
      prefix: 'fas'
    }).html[0]);
  }

}
