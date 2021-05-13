import { Component, Type } from '@angular/core';
import { BlogpostModel, CrudJoiner } from '../../../../core';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['../base.listing.sass', 'blogpost.listing.sass'],
  templateUrl: 'blogpost.listing.html'
})

export class BlogpostListingComponent
  extends BaseListing<BlogpostModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(BlogpostModel)
    .with('activity');

  protected model: Type<BlogpostModel> = BlogpostModel;

  protected path: string = 'blogposts';

  protected size: number = 6;

}
