import { Component, Type } from '@angular/core';
import { CrudJoiner, InfopageModel } from '../../../../core';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.sass', 'infopage.object.sass'],
  templateUrl: 'infopage.object.html'
})

export class InfopageObjectComponent
  extends BaseObject<InfopageModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(InfopageModel, {
    required: true
  }).with('topic');

  protected model: Type<InfopageModel> = InfopageModel;

  protected path: string = 'infopages';

  public get topic(): any {
    return this.item.topic;
  }

}
