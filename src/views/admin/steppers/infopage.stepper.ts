import { Component, Type } from '@angular/core';
import { CrudJoiner, InfopageModel } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { InfopageFormComponent } from '../forms/infopage.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'infopage-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n>createInfopage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editInfopage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n>main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'translations'">
          <i18n>translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class InfopageStepperComponent
  extends BaseStepper<InfopageModel> {

  public root: string = 'pages';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: InfopageFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(InfopageModel)
    .with('topic')
    .with('translations').yield('language');

  protected model: Type<InfopageModel> = InfopageModel;

  public get title(): string {
    const data = this.route.snapshot.routeConfig.children[0].data;
    return data.form && data.form.group.get('title').value;
  }

  protected get path(): string {
    return 'infopages';
  }

}
