import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['map.component.sass'],
  templateUrl: 'map.component.html'
})

export class MapComponent
  extends RoutingComponent
  implements OnInit {

  protected get routing(): Route {
    return {
      path: 'map',
      children: [
        {
          path: ''
        },
        {
          path: ':type'
        }
      ]
    };
  }

  public constructor(
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
  }

  public active(href: string): boolean {
    return this.router.url.startsWith(['', this.routing.path, href].join('/'));
  }

}
