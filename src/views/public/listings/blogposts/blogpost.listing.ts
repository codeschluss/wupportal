import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BlogModel } from '../../../../realm/models/blog.model';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['blogpost.listing.scss'],
  templateUrl: 'blogpost.listing.html'
})

export class BlogpostListingComponent
  extends BaseListing<BlogModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(BlogModel)
    .with('activity').yield('address').yield('suburb')
    .with('activity').yield('category')
    .with('activity').yield('schedules');

  protected model: Type<BlogModel> = BlogModel;

  protected path: string = 'blogposts';

  protected size: number = 8;

}
