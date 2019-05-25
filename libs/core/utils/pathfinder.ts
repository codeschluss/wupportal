import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'lodash';

@Injectable({ providedIn: 'root' })
export class Pathfinder {

  public constructor(
    private router: Router
  ) { }

  public to(component: Type<any>): string[] {
    const finder = (route, path = ['/']) => {
      const mapper = (r) => flatMap(r, (i) => finder(i, path.concat(i.path)));

      if (route.component === component) {
        return path;
      } else if (route.children) {
        return mapper(route.children);
      } else if ((route['_loadedConfig'] || { }).routes) {
        return mapper(route['_loadedConfig'].routes);
      }
    };

    const paths = flatMap(this.router.config, (i) => finder(i)).filter(Boolean);
    paths.push(((path) => (path || '').replace('/:uuid', ''))(paths.pop()));

    return paths;
  }

}
