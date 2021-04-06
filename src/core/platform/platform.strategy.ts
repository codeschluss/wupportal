import { HashLocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PlatformStrategy {

  public constructor(
    platformLocation: PlatformLocation
  ) {
    switch (true) {
      default:
      case typeof cordova === 'undefined':
        return new PathLocationStrategy(platformLocation, '/');

      case cordova.platformId === 'android':
      case cordova.platformId === 'ios':
        return new HashLocationStrategy(platformLocation);
    }
  }

}
