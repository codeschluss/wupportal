import { Route } from '@angular/router';

export abstract class Selfrouter {

  protected abstract get routing(): Route;

  public static get routing(this: any): Route {
    return new this().routing;
  }

  protected walk(root: Route[], routes?: Route[]): Route[] {
    const walker = (route, children) => {
      if (route.component === this.constructor) {
        children
          ? route.children = children
          : delete route.children;
      } else if (route.children) {
        route.children = route.children
          .map((child) => walker(child, children));
      } else if ((route['_loadedConfig'] || { }).routes) {
        route['_loadedConfig'].routes = route['_loadedConfig'].routes
          .map((child) => walker(child, children));
      }

      return route;
    };

    return root.map((route) => walker(route, routes));
  }

}
