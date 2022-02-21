import { Component } from '@angular/core';
import { CrudJoiner, LabelModel, LanguageModel, StaticPageModel } from '../../../../core';
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
    staticPage: CrudJoiner.of(StaticPageModel, {
      required: true
    }).with('translatables').yield('language')
  };

  public get label(): LabelModel[] {
    return this.route.snapshot.data.label || [];
  }

  public staticPage(tagId: string): StaticPageModel {
    return this.route.snapshot.data.staticPage?.find((i) => i.tagId === tagId)
      || new StaticPageModel({ content: tagId, tagId });
  }

}
