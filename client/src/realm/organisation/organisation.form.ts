import { Component, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { OrganisationModel } from '../organisation/organisation.model';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'name'" i18n="@@title">title</i18n>
        <i18n *ngSwitchCase="'description'"
          i18n="@@description">description</i18n>
        <i18n *ngSwitchCase="'contactName'"
          i18n="@@contactName">contactName</i18n>
        <i18n *ngSwitchCase="'phone'" i18n="@@phone">phone</i18n>
        <i18n *ngSwitchCase="'mail'" i18n="@@mail">mail</i18n>
        <i18n *ngSwitchCase="'organisation'"
          i18n="@@organisation">organisation</i18n>
        <i18n *ngSwitchCase="'category'" i18n="@@category">category</i18n>
        <i18n *ngSwitchCase="'targetGroups'"
          i18n="@@targetGroups">targetGroups</i18n>
        <i18n *ngSwitchCase="'tags'" i18n="@@tags">tags</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class OrganisationFormComponent extends BaseForm<OrganisationModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: StringFieldComponent,
      multi: true,
      tests: [Validators.required]
    },
    {
      name: 'website',
      input: StringFieldComponent
    },
    {
      name: 'phone',
      input: StringFieldComponent
    },
    {
      name: 'mail',
      input: StringFieldComponent,
      tests: [Validators.email]
    },
    {
      name: 'videoUrl',
      input: SelectFieldComponent,
      model: OrganisationModel
    }
  ];

  public model: Type<OrganisationModel> = OrganisationModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
