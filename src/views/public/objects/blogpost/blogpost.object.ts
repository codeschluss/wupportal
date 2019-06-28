import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { BlogModel } from '../../../../realm/models/blog.model';

@Component({
  styleUrls: ['blogpost.object.scss'],
  templateUrl: 'blogpost.object.html'
})

export class BlogpostObjectComponent extends Selfrouter {

  protected routing: Route = {
    path: 'blogposts/:uuid',
    resolve: {
      blogpost: CrudResolver
    },
    data: {
      blogpost: CrudJoiner.of(BlogModel)
    }
  };

}
