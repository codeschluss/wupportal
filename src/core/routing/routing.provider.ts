import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RoutingProvider {

  public constructor(
    private router: Router
  ) { }

  public to(component: Type<any>): string[] {
    const finder = (route, path = ['/']) => {
      const mapper = (r) => r.flatMap((i) => finder(i, path.concat(i.path)));

      if (route.component === component) {
        return path;
      } else if (route.children) {
        return mapper(route.children);
      } else if ((route._loadedConfig || { }).routes) {
        return mapper(route._loadedConfig.routes);
      }
    };

    const paths = this.router.config.flatMap((i) => finder(i)).filter(Boolean);
    paths.push(((path) => (path || '').replace('/:uuid', ''))(paths.pop()));

    return paths;
  }

}
