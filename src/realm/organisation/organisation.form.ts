import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent, UrlFieldComponent } from '@portal/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
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
      input: UrlFieldComponent,
      tests: [Validators.pattern(/^https?:\/\/\S+\.\S+(\/\S*)?$/)],
      type: 'url'
    },
    {
      name: 'phone',
      input: StringFieldComponent,
      type: 'tel'
    },
    {
      name: 'mail',
      input: StringFieldComponent,
      tests: [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
      type: 'email'
    },
    {
      name: 'videoUrl',
      input: UrlFieldComponent,
      tests: [Validators.pattern(/^https?:\/\/\S+\.\S+(\/\S*)?$/)],
      type: 'url'
    }
  ];

  public model: Type<OrganisationModel> = OrganisationModel;

  public persist(): Observable<any> {
    const images = this.updated('images');

    this.item.addressId = this.group.get('address').value.id;

    return super.persist().pipe(mergeMap((i) => forkJoin([of(i)].concat(
      ...images.add.map((g) => this.provider.pasteImages(i.id, [g])),
      ...images.del.map((g) => this.provider.unlinkImage(i.id, g.id)),
    )).pipe(
      map((results) => results.shift()),
      mergeMap((item) => this.cascade(item, 'addressId', 'relinkAddress'))
    )));
  }

}
