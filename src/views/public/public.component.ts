import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  template: `
    <label text="Hello nativescript!">Hello nguniversal!</label>
  `
})

export class PublicComponent {

  public constructor(
    @Inject(PLATFORM_ID) platformId: any
  ) {
    if (isPlatformBrowser(platformId)) {
      console.log('Hello angular!');
    }
  }

}
