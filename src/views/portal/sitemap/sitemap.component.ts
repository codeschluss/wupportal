import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CategoryModel, CoreSettings, CrudJoiner, CrudResolver, JwtClaims, RoutingComponent, SocialMediaModel, StaticPageModel, TokenResolver, TopicModel } from '../../../core';

@Component({
  styleUrls: ['sitemap.component.sass'],
  templateUrl: 'sitemap.component.html'
})

export class SitemapComponent
  extends RoutingComponent {

  public get categories(): CategoryModel[] {
    return this.route.snapshot.data.categories || [];
  }

  public get claims(): JwtClaims {
    const claims = this.settings.jwtClaims;

    if (this.route.snapshot.data.tokens.access.id) {
      return Object.keys(claims).reduce((claim, key) => Object.assign(claim, {
        [key]: this.route.snapshot.data.tokens.access[claims[key]]
      }), { } as JwtClaims);
    }
  }

  public get socialMedia(): SocialMediaModel[] {
    return this.route.snapshot.data.socialMedia || [];
  }

  public get staticPages(): StaticPageModel[] {
    return this.route.snapshot.data.staticPages || [];
  }

  public get topics(): TopicModel[] {
    return this.route.snapshot.data.topics || [];
  }

  protected get routing(): Route {
    return {
      path: 'sitemap',
      resolve: {
        categories: CrudResolver,
        socialMedia: CrudResolver,
        topics: CrudResolver,
        tokens: TokenResolver
      },
      data: {
        resolve: {
          categories: CrudJoiner.of(CategoryModel),
          socialMedia: CrudJoiner.of(SocialMediaModel),
          topics: CrudJoiner.of(TopicModel)
        }
      }
    };
  }

  public constructor(
    private route: ActivatedRoute,
    private settings: CoreSettings
  ) {
    super();
  }

}
