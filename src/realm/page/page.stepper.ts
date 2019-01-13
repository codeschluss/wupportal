import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { TranslationFormComponent } from '../translation/translation.form';
import { PageFormComponent } from './page.form';
import { PageModel } from './page.model';

@Component({
  selector: 'page-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createPage">createPage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editPage">editPage</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'page'">
          <i18n i18n="@@Page">Page</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'translations'">
          <i18n i18n="@@translations">translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class PageStepperComponent
  extends BaseStepper<PageModel> {

  public root: string = 'page';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: PageFormComponent,
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(PageModel)
    .with('topic');

  protected model: Type<PageModel> = PageModel;

  public get title(): string {
    const data = this.route.snapshot.routeConfig.children[0].data;
    return data.form && data.form.group.get('title').value;
  }

}
