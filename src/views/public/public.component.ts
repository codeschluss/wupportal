import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  template: `
    <label text="Hello nativescript!">{{ text }}</label>
  `
})

export class PublicComponent {

  public text: string = '';

  public constructor(
    @Inject(PLATFORM_ID) platformId: any
  ) {
    if (isPlatformBrowser(platformId)) {
      this.text = 'Hello angular!';
    } else if (isPlatformServer(platformId)) {
      this.text = 'Hello nguniversal!';
    }
  }

}
