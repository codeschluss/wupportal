import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { TranslationFormComponent } from '../translation/translation.form';
import { TagFormComponent } from './tag.form';
import { TagModel } from './tag.model';

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

        <ng-container *ngSwitchCase="'tag'">
          <i18n i18n="@@tag">tag</i18n>
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

  public root: string = 'tag';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: TagFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TagModel);

  protected model: Type<TagModel> = TagModel;

}
