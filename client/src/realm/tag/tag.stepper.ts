import { Component, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
        <i18n *ngSwitchCase="'tag'" i18n="@@tag">tag</i18n>
        <i18n *ngSwitchCase="'translations'"
          i18n="@@translations">translations</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class TagStepperComponent extends BaseStepper<TagModel> {

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

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

}
