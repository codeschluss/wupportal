import { Component, Type } from '@angular/core';
import { SocialMediaModel } from 'src/core/models/socialmedia.model';
import { CrudJoiner } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { SocialMediaFormComponent } from '../forms/socialmedia.form';

@Component({
  selector: 'socialmedia-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n>createSocialMedia</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editSocialMedia</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n>main</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SocialMediaStepperComponent
  extends BaseStepper<SocialMediaModel> {

  public root: string = 'socialmedia';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: SocialMediaFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SocialMediaModel);

  protected model: Type<SocialMediaModel> = SocialMediaModel;

}
