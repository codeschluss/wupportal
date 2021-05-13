import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver } from '../../../../core';
import { MarkupModel } from '../../../../core/models/markup.model';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.sass', 'policies.page.sass'],
  templateUrl: 'policies.page.html'
})

export class PoliciesPageComponent
  extends BasePage {

  public get content(): string {
    return this.route.snapshot.data.markups?.find((markup) => {
      return markup.tagId === this.path
    })?.content || this.path;
  }

  protected path: string = 'policies';

  protected get routing(): Route {
    return {
      path: this.path,
      resolve: {
        markups: CrudResolver
      },
      data: {
        resolve: {
          markups: CrudJoiner.of(MarkupModel, {
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
