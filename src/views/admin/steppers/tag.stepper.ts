import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BaseStepper, FormStep } from '@wooportal/forms';
import { TagModel } from '../../../base/models/tag.model';
import { TagFormComponent } from '../forms/tag.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'tag-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createTag">createTag</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editTag">editTag</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'translations'">
          <i18n i18n="@@translations">translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class TagStepperComponent
  extends BaseStepper<TagModel> {

  public root: string = 'tags';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: TagFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TagModel)
    .with('translations').yield('language');

  protected model: Type<TagModel> = TagModel;

}
