import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'footer-component',
  styleUrls: ['footer.component.sass'],
  templateUrl: 'footer.component.html'
})

export class FooterComponent {

  public platform?: string;

  public constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.document.addEventListener(
      "deviceready", () => this.platform = window.device.platform, false);
  }
}
