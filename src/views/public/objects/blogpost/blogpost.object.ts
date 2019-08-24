import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BlogModel } from '../../../../realm/models/blog.model';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.scss', 'blogpost.object.scss'],
  templateUrl: 'blogpost.object.html'
})

export class BlogpostObjectComponent extends BaseObject<BlogModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(BlogModel)
    .with('activity').yield('address').yield('suburb')
    .with('activity').yield('category')
    .with('activity').yield('schedules');

    protected model: Type<BlogModel> = BlogModel;

    protected path: string = 'blogposts';

}
