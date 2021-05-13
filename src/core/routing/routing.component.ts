import { Route } from '@angular/router';

export abstract class RoutingComponent {

  protected abstract get routing(): Route;

  public static get routing(): Route {
    return Object.assign(new (this as any)().routing, {
      component: this
    });
  }

  protected walk(root: Route[], routes: Route[]): Route[] {
    const walker = (route, children) => {
      if (route.component === this.constructor) {
        children
          ? route.children = children
          : delete route.children;
      } else if (route.children) {
        route.children = route.children
          .map((child) => walker(child, children));
      } else if ((route._loadedConfig || { }).routes) {
        route._loadedConfig.routes = route._loadedConfig.routes
          .map((child) => walker(child, children));
      }

      return route;
    };

    return root.map((route) => walker(route, routes));
  }

}
