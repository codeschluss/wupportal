import { Component, Type } from '@angular/core';
import { BlogpostModel, CrudJoiner } from '../../../../core';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.sass', 'blogpost.object.sass'],
  templateUrl: 'blogpost.object.html'
})

export class BlogpostObjectComponent
  extends BaseObject<BlogpostModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(BlogpostModel, {
    required: true
  }).with('activity').yield('address').yield('suburb')
    .with('activity').yield('category')
    .with('activity').yield('schedules')
    .with('blogger')
    .with('images');

  protected model: Type<BlogpostModel> = BlogpostModel;

  protected path: string = 'blogposts';

  public get blogger(): any {
    return this.item.blogger;
  }

}
