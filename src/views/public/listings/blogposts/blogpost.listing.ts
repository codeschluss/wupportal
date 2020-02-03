import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BlogpostModel } from '../../../../base/models/blogpost.model';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['../base.listing.scss', 'blogpost.listing.scss'],
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
