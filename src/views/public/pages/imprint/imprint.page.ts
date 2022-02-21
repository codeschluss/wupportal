import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, StaticPageModel } from '../../../../core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.sass', 'imprint.page.sass'],
  templateUrl: 'imprint.page.html'
})

export class ImprintPageComponent
  extends BasePage {

  public get content(): string {
    return this.route.snapshot.data.staticPages?.find((staticPage) => {
      return staticPage.tagId === this.path
    })?.content || this.path;
  }

  protected path: string = 'imprint';

  protected get routing(): Route {
    return {
      path: this.path,
      resolve: {
        staticPages: CrudResolver
      },
      data: {
        resolve: {
          staticPages: CrudJoiner.of(StaticPageModel, {
            required: true
          })
        }
      }
    };
  }

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

}
