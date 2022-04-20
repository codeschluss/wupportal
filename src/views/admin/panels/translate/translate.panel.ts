import { Component } from '@angular/core';
import { CrudJoiner, LabelModel, LanguageModel } from '../../../../core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: 'translate.panel.html'
})

export class TranslatePanelComponent
  extends BasePanel {

  protected path: string = 'translate';

  protected resolve: Record<string, CrudJoiner> = {
    label: CrudJoiner.of(LabelModel, {
      required: true
    }).with('translatables').yield('language'),
    language: CrudJoiner.of(LanguageModel, {
      required: true
    })
  };

  public get label(): LabelModel[] {
    return this.route.snapshot.data.label || [];
  }

}
