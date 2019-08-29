import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { PageModel } from '../../../../realm/models/page.model';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.scss', 'infopage.object.scss'],
  templateUrl: 'infopage.object.html'
})

export class InfopageObjectComponent extends BaseObject<PageModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(PageModel)
    .with('topic');

  protected model: Type<PageModel> = PageModel;

  protected path: string = 'infopages';

}
