import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RoutingComponent, StaticPageModel } from '../../../core';

@Component({
  styleUrls: ['static-page.component.sass'],
  templateUrl: 'static-page.component.html'
})

export class StaticPageComponent
  extends RoutingComponent
  implements OnInit {

  public staticPage: Observable<StaticPageModel>;

  protected get routing(): Route {
    return {
      path: ':label'
    };
  }

  public constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.staticPage = this.route?.params.pipe(map((params) => {
      const staticPage = this.route.snapshot.data.staticPages.find((item) => {
        return item.label === params.label;
      });

      if (!staticPage) {
        this.router.navigateByUrl('/error/404', {
          replaceUrl: true
        });
      }

      return staticPage;
    }));
  }

}
