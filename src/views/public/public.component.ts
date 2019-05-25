import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TokenProvider } from '@wooportal/core';

@Component({
  template: `
    <h1>Hello World, I'm SSR!</h1>
    <router-outlet></router-outlet>
  `
})

export class PublicComponent {

  public constructor(
    @Inject(PLATFORM_ID) platformId: any,
    tokenProvider: TokenProvider
  ) {
    if (isPlatformBrowser(platformId)) {
      console.log(tokenProvider);
    }
  }

}
