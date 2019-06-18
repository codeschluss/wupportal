import { Component } from '@angular/core';
import { PlatformProvider } from '@wooportal/core';

@Component({
  template: `
    <label text="Hello nativescript!">{{ text }}</label>
  `
})

export class PublicComponent {

  public text: string = '';

  public constructor(
    platform: PlatformProvider
  ) {
    if (platform.name === 'Web') {
      this.text = 'Hello angular!';
    } else if (platform.name === 'Server') {
      this.text = 'Hello nguniversal!';
    }
  }

}
