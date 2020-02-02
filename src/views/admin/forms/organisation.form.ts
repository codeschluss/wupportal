import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Box, TokenProvider } from '@wooportal/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { OrganisationModel } from '../../../base/models/organisation.model';
import { OrganisationProvider } from '../../../base/providers/organisation.provider';
import { TranslationProvider } from '../../../base/providers/translation.provider';
import { BaseForm, FormField } from '../base/base.form';
import { BaseTests } from '../base/base.tests';
import { EditorFieldComponent } from '../fields/editor.field';
import { StringFieldComponent } from '../fields/string.field';
import { UrlFieldComponent } from '../fields/url.field';

@Component({
  selector: 'organisation-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <i18n i18n="@@email">email</i18n><sup>#</sup>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
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

export class OrganisationFormComponent
  extends BaseForm<OrganisationModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: EditorFieldComponent,
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
      tests: [BaseTests.neither('phone', 'mail')],
      type: 'tel'
    },
    {
      name: 'mail',
      input: StringFieldComponent,
      tests: [
        BaseTests.neither('phone', 'mail'),
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

  public constructor(
    private organisationProvider: OrganisationProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public persist(): Observable<any> {
    this.item.addressId = this.group.get('address').value.id;

    return super.persist().pipe(
      mergeMap((item) => this.tokenProvider.refresh().pipe(map(() => item)))
    );
  }

  protected cascade(item: OrganisationModel): Observable<any> {
    const links = [];

    const images = this.updated('images');
    if (images.add.length) { links.push(this.organisationProvider
      .pasteImages(item.id, images.add)); }
    if (images.del.length) { links.push(this.organisationProvider
      .unlinkImages(item.id, images.del.map((i) => i.id))); }

    if (this.item.id) {
      const aId = this.item.address && this.item.address.id;
      if (aId !== this.item.addressId) { links.push(this.organisationProvider
        .relinkAddress(item.id, Box(this.item.addressId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
