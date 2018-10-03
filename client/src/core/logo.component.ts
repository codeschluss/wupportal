import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'logo-component',
  styles: [
    ':host { font-family: sans-serif; font-weight: bold; }',
    'mat-icon { vertical-align: sub; width: 3.3em; }'
  ],
  template: `<mat-icon svgIcon="logo"></mat-icon>upportal`
})

export class LogoComponent {

  public static readonly imports = [
    MatIconModule
  ];

  public constructor(
    private domSanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry
  ) {
    this.iconRegistry.addSvgIcon('logo', this.domSanitizer
      .bypassSecurityTrustResourceUrl('/imgs/wuppertal.svg'));
  }

}
