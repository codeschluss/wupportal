import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { Box } from '@portal/core';
import { BaseForm, FormField, StringFieldComponent, Tests, UrlFieldComponent } from '@portal/forms';
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
          <i18n i18n="@@mail">mail</i18n><sup>#</sup>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n i18n="@@phone">phone</i18n><sup>#</sup>
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
      tests: [Tests.either('phone', 'mail')],
      type: 'tel'
    },
    {
      name: 'mail',
      input: StringFieldComponent,
      tests: [
        Tests.either('phone', 'mail'),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ],
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
    this.item.addressId = this.group.get('address').value.id;

    return super.persist().pipe(
      mergeMap((item) => this.tokenProvider.refresh().pipe(map(() => item)))
    );
  }

  protected cascade(item: OrganisationModel): Observable<any> {
    const links = [];
    const provider = this.model['provider'];

    const images = this.updated('images');
    if (images.add.length) { links.push(provider
      .pasteImages(item.id, images.add)); }
    if (images.del.length) { links.push(provider
      .unlinkImages(item.id, images.del.map((i) => i.id))); }

    if (this.item.id) {
      const addrId = this.item.address && this.item.address.id;
      if (addrId !== this.item.addressId) { links.push(provider
        .relinkAddress(item.id, Box(this.item.addressId))); }
    }

    return forkJoin([of(item), ...links]).pipe(map((items) => items.shift()));
  }

}
