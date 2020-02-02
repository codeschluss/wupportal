import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { InfopageModel } from '../../../../base/models/infopage.model';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.scss', 'infopage.object.scss'],
  templateUrl: 'infopage.object.html'
})

export class InfopageObjectComponent extends BaseObject<InfopageModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(InfopageModel, {
    required: true
  }).with('topic');

  protected model: Type<InfopageModel> = InfopageModel;

  protected path: string = 'infopages';

}
