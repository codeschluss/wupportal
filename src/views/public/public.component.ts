import { Component } from '@angular/core';
import { Platform } from '@wooportal/core';

@Component({
  template: `
    <label text="Hello nativescript!">{{ text }}</label>
  `
})

export class PublicComponent {

  public text: string = '';

  public constructor(
    platform: Platform
  ) {
    if (platform.name === 'Web') {
      this.text = 'Hello angular!';
    } else if (platform.name === 'Server') {
      this.text = 'Hello nguniversal!';
    }
  }

}
