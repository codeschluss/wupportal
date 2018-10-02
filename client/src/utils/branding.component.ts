import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'branding-component',
  styles: [
    ':host { font-family: sans-serif; font-weight: bold; }',
    'mat-icon { vertical-align: sub; width: 3.3em; }'
  ],
  template: `<mat-icon svgIcon="branding"></mat-icon>upportal`
})

export class BrandingComponent {

  public static readonly imports = [
    MatIconModule
  ];

  public constructor(
    private domSanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry
  ) {
    this.iconRegistry.addSvgIcon('branding', this.domSanitizer
      .bypassSecurityTrustResourceUrl('/imgs/wuppertal.svg'));
  }

}
