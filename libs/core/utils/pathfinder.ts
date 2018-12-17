import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Pathfinder {

  public constructor(
    private router: Router
  ) { }

  public to(component: Type<any>): string[] {
    const finder = (route, path = ['/']) => {
      if (route.component === component) {
        return path;
      } else if (route.children) {
        return route.children
          .flatMap((child) => finder(child, path.concat(child.path)));
      } else if ((route['_loadedConfig'] || { }).routes) {
        return route['_loadedConfig'].routes
          .flatMap((child) => finder(child, path.concat(child.path)));
      }
    };

    const paths = this.router.config
      .flatMap((route) => finder(route)).filter((segment) => !!segment);
    paths.push(((path) => path.replace('/:uuid', ''))(paths.pop()));

    return paths;
  }

}
