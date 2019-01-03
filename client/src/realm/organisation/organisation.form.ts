import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { CrudModel } from '@portal/core';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { Observable } from 'rxjs';
import { OrganisationModel } from '../organisation/organisation.model';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <i18n i18n="@@mail">mail</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n i18n="@@phone">phone</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'videoUrl'">
          <i18n i18n="@@videoUrl">videoUrl</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'website'">
          <i18n i18n="@@website">website</i18n>
        </ng-container>
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

  protected persist(items?: { [key: string]: CrudModel }): Observable<any> {
    this.item.addressId = this.value('address', items).id;
    return super.persist(items);
  }

}
