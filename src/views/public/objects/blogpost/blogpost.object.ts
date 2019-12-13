import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BlogpostModel } from '../../../../realm/models/blogpost.model';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.scss', 'blogpost.object.scss'],
  templateUrl: 'blogpost.object.html'
})

export class BlogpostObjectComponent extends BaseObject<BlogpostModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(BlogpostModel, {
    required: true
  }).with('activity').yield('address').yield('suburb')
    .with('activity').yield('category')
    .with('activity').yield('schedules')
    .with('images');

  protected model: Type<BlogpostModel> = BlogpostModel;

  protected path: string = 'blogposts';

}
