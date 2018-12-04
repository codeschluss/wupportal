import { Injectable } from '@angular/core';

declare function require(name: string);

@Injectable({ providedIn: 'root' })
export class CorePackage {

  private packageJson: any = require('libs/core/package.json');

  public get bugs(): {
    email: string,
    url: string
  } {
    return this.packageJson.bugs;
  }

  public get repository(): {
    type: string,
    url: string
  } {
    return this.packageJson.repository;
  }

}
