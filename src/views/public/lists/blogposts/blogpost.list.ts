import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { BlogModel } from '../../../../realm/models/blog.model';

@Component({
  styleUrls: ['blogpost.list.scss'],
  templateUrl: 'blogpost.list.html'
})

export class BlogpostListComponent extends Selfrouter {

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
