import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { Observable } from 'rxjs';
import { OrganisationModel } from '../organisation/organisation.model';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'description'"
          i18n="@@description">description</i18n>
        <i18n *ngSwitchCase="'mail'" i18n="@@mail">mail</i18n>
        <i18n *ngSwitchCase="'name'" i18n="@@title">title</i18n>
        <i18n *ngSwitchCase="'phone'" i18n="@@phone">phone</i18n>
        <i18n *ngSwitchCase="'videoUrl'" i18n="@@videoUrl">videoUrl</i18n>
        <i18n *ngSwitchCase="'website'" i18n="@@website">website</i18n>
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
      input: StringFieldComponent,
      model: OrganisationModel
    }
  ];

  public model: Type<OrganisationModel> = OrganisationModel;

  protected persist(item: OrganisationModel = this.item): Observable<any> {
    item.addressId = this.value('address', item).id;
    return super.persist(item);
  }

}
