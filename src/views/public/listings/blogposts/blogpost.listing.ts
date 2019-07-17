import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { BlogModel } from '../../../../realm/models/blog.model';

@Component({
  styleUrls: ['blogpost.listing.scss'],
  templateUrl: 'blogpost.listing.html'
})

export class BlogpostListingComponent extends Selfrouter {

  protected routing: Route = {
    path: 'blogposts',
    resolve: {
      blogposts: CrudResolver
    },
    data: {
      resolve: {
        blogposts: CrudJoiner.of(BlogModel)
      }
    }
  };

}
