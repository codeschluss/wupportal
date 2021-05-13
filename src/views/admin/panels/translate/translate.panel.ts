import { Component } from '@angular/core';
import { CrudJoiner, LabelModel, LanguageModel } from '../../../../core';
import { MarkupModel } from '../../../../core/models/markup.model';
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
    }),
    markup: CrudJoiner.of(MarkupModel, {
      required: true
    }).with('translatables').yield('language')
  };

  public get label(): LabelModel[] {
    return this.route.snapshot.data.label || [];
  }

  public markup(tagId: string): MarkupModel {
    return this.route.snapshot.data.markup?.find((i) => i.tagId === tagId)
      || Object.assign(new MarkupModel(), { content: tagId, tagId });
  }

}
