import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActivityModel, ActivityProvider, Box, CategoryModel, CoreSettings, OrganisationModel, TargetGroupModel, TokenProvider, TranslationProvider, UserProvider } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { BaseTests } from '../base/base.tests';
import { EditorFieldComponent } from '../fields/editor.field';
import { ImageFieldComponent } from '../fields/image.field';
import { InputFieldComponent } from '../fields/input.field';
import { SelectFieldComponent } from '../fields/select.field';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <section>
      <label class="mat-body-strong">
        <i18n>compilation</i18n>
      </label>
      <nav>
        <button mat-stroked-button
          color="primary"
          (click)="fillUserData()">
          <i18n>fillUserData</i18n>
        </button>
        <button mat-stroked-button
          color="primary"
          [disabled]="!this.organisation"
          (click)="fillOrganisationData()">
          <i18n>fillOrganisationData</i18n>
        </button>
      </nav>
    </section>
  `, `
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'admissionFee'">
          <i18n>admissionFee</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'category'">
          <i18n>category</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'contactName'">
          <i18n>contactName</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'description'">
          <i18n>description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <i18n>email</i18n><sup>#</sup>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'organisation'">
          <i18n>organisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n>phone</i18n><sup>#</sup>
        </ng-container>
        <ng-container *ngSwitchCase="'targetGroups'">
          <i18n>targetGroups</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'titleImage'">
          <i18n>titleImage</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ActivityFormComponent
  extends BaseForm<ActivityModel> {

  public fields: FormField[] = [
    {
      name: 'organisation',
      input: SelectFieldComponent,
      label: 'name',
      model: OrganisationModel,
      tests: [Validators.required]
    },
    {
      name: 'name',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: EditorFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'admissionFee',
      input: InputFieldComponent,
      tests: [Validators.pattern(/^([1-9]\d*|0)(\.\d+)?$/)],
      label: 'admissionFee',
      type: 'number'
    },
    {
      name: 'contactName',
      input: InputFieldComponent
    },
    {
      name: 'phone',
      input: InputFieldComponent,
      tests: [BaseTests.neither('phone', 'mail')],
      type: 'tel'
    },
    {
      name: 'mail',
      input: InputFieldComponent,
      tests: [
        BaseTests.neither('phone', 'mail'),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ],
      type: 'email'
    },
    {
      name: 'category',
      input: SelectFieldComponent,
      label: 'name',
      model: CategoryModel,
      tests: [Validators.required]
    },
    {
      name: 'targetGroups',
      input: SelectFieldComponent,
      label: 'name',
      model: TargetGroupModel,
      multi: true
    },
    {
      name: 'titleImage',
      input: ImageFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<ActivityModel> = ActivityModel;

  public get organisation(): OrganisationModel {
    return this.group.get('organisation').value;
  }

  public constructor(
    private activityProvider: ActivityProvider,
    private settings: CoreSettings,
    private userProvider: UserProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public fillOrganisationData(): void {
    const organisation = this.group.get('organisation').value;
    this.group.get('contactName').patchValue(organisation.label);
    this.group.get('mail').patchValue(organisation.mail);
    this.group.get('phone').patchValue(organisation.phone);
  }

  public fillUserData(): void {
    this.userProvider.readOne(this.token.id).subscribe((user) => {
      this.group.get('contactName').patchValue(user.name);
      this.group.get('mail').patchValue(user.username);
      this.group.get('phone').patchValue(user.phone);
    });
  }

  public persist(): Observable<any> {
    this.item.addressId = this.group.get('address').value.id;
    this.item.categoryId = this.group.get('category').value.id;
    this.item.organisationId = this.group.get('organisation').value.id;

    return super.persist().pipe(
      mergeMap((item) => this.tokenProvider.refresh().pipe(map(() => item)))
    );
  }

  protected ngPostInit(): void {
    if (this.item.id && !this.token.createdActivities.includes(this.item.id)) {
      this.fields[0].locked = true;
    }

    this.fields[0].options = Array.from(new Set([
      ...this.token[this.settings.jwtClaims.organisationAdmin],
      ...this.token[this.settings.jwtClaims.organisationUser]
    ])).map((id) => this.fields[0].options.find((o) => o.id === id));
  }

  protected cascade(item: ActivityModel): Observable<any> {
    const links = [];

    const image = this.group.get('titleImage').value;
    links.push(this.activityProvider.pasteImage(item.id, image));

    const images = this.updated('images');
    if (images.add.length) { links.push(this.activityProvider
      .pasteImages(item.id, images.add)); }
    if (images.del.length) { links.push(this.activityProvider
      .unlinkImages(item.id, images.del.map((i) => i.id))); }

    const schedules = this.updated('schedules');
    if (schedules.add.length) { links.push(this.activityProvider
      .pasteSchedules(item.id, schedules.add)); }
    if (schedules.del.length) { links.push(this.activityProvider
      .unlinkSchedules(item.id, schedules.del.map((i) => i.id))); }

    const targetGroups = this.updated('targetGroups');
    if (targetGroups.add.length) { links.push(this.activityProvider
      .linkTargetGroups(item.id, targetGroups.add.map((i) => i.id))); }
    if (targetGroups.del.length) { links.push(this.activityProvider
      .unlinkTargetGroups(item.id, targetGroups.del.map((i) => i.id))); }

    if (this.item.id) {
      const aId = this.item.address && this.item.address.id;
      if (aId !== this.item.addressId) { links.push(this.activityProvider
        .relinkAddress(item.id, Box(this.item.addressId))); }

      const cId = this.item.category && this.item.category.id;
      if (cId !== this.item.categoryId) { links.push(this.activityProvider
        .relinkCategory(item.id, Box(this.item.categoryId))); }

      const oId = this.item.organisation && this.item.organisation.id;
      if (oId !== this.item.organisationId) { links.push(this.activityProvider
        .relinkOrganisation(item.id, Box(this.item.organisationId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
