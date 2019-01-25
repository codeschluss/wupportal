import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Box, TokenProvider } from '@portal/core';
import { BaseForm, ChipListFieldComponent, FormField, SelectFieldComponent, StringFieldComponent, Tests } from '@portal/forms';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { TranslationBase } from '../translation/translation.base';
import { TranslationProvider } from '../translation/translation.provider';
import { UserProvider } from '../user/user.provider';
import { ActivityModel } from './activity.model';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <section>
      <label class="mat-body-strong">
        <i18n i18n="@@compilation">compilation</i18n>
      </label>
      <nav>
        <button mat-button color="primary" (click)="contactUser()">
          <i18n i18n="@@contactUser">contactUser</i18n>
        </button>
        <button mat-button color="primary" [disabled]="!this.item.organisation"
          (click)="contactOrganisation()">
          <i18n i18n="@@contactOrganisation">contactOrganisation</i18n>
        </button>
      </nav>
    </section>

    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'category'">
          <i18n i18n="@@category">category</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'contactName'">
          <i18n i18n="@@contactName">contactName</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <i18n i18n="@@mail">mail</i18n><sup>#</sup>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'organisation'">
          <i18n i18n="@@organisation">organisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n i18n="@@phone">phone</i18n><sup>#</sup>
        </ng-container>
        <ng-container *ngSwitchCase="'tags'">
          <i18n i18n="@@tags">tags</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'targetGroups'">
          <i18n i18n="@@targetGroups">targetGroups</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ActivityFormComponent
  extends TranslationBase<ActivityModel> {

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
      name: 'contactName',
      input: StringFieldComponent
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
      name: 'organisation',
      input: SelectFieldComponent,
      label: 'name',
      model: OrganisationModel,
      tests: [Validators.required]
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
      name: 'tags',
      input: ChipListFieldComponent,
      label: 'name',
      model: TagModel
    }
  ];

  public model: Type<ActivityModel> = ActivityModel;

  public constructor(
    private userProvider: UserProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(translationProvider, route, tokenProvider);
  }

  public contactOrganisation(): void {
    this.group.get('contactName').patchValue(this.item.organisation.name);
    this.group.get('mail').patchValue(this.item.organisation.mail);
    this.group.get('phone').patchValue(this.item.organisation.phone);
  }

  public contactUser(): void {
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
      this.fields[5].locked = true;
    }

    if (!this.token[ClientPackage.config.jwtClaims.superUser]) {
      this.fields[5].options = [...new Set([
        ...this.token[ClientPackage.config.jwtClaims.organisationAdmin],
        ...this.token[ClientPackage.config.jwtClaims.organisationUser]
      ])].map((id) => this.fields[5].options.find((o) => o.id === id));
    }
  }

  protected cascade(item: ActivityModel): Observable<any> {
    const links = [];
    const provider = this.model['provider'];

    const schedules = this.updated('schedules');
    if (schedules.add.length) { links.push(provider
      .pasteSchedules(item.id, schedules.add)); }
    if (schedules.del.length) { links.push(provider
      .unlinkSchedules(item.id, schedules.del.map((i) => i.id))); }

    const tags = this.updated('tags');
    if (tags.add.length) { links.push(provider
      .pasteTags(item.id, tags.add)); }
    if (tags.del.length) { links.push(provider
      .unlinkTags(item.id, tags.del.map((i) => i.id))); }

    const targetGroups = this.updated('targetGroups');
    if (targetGroups.add.length) { links.push(provider
      .linkTargetGroups(item.id, targetGroups.add.map((i) => i.id))); }
    if (targetGroups.del.length) { links.push(provider
      .unlinkTargetGroups(item.id, targetGroups.del.map((i) => i.id))); }

    if (this.item.id) {
      const addrId = this.item.address && this.item.address.id;
      if (addrId !== this.item.addressId) { links.push(provider
        .relinkAddress(item.id, Box(this.item.addressId))); }

      const goryId = this.item.category && this.item.category.id;
      if (goryId !== this.item.categoryId) { links.push(provider
        .relinkCategory(item.id, Box(this.item.categoryId))); }

      const orgaId = this.item.organisation && this.item.organisation.id;
      if (orgaId !== this.item.organisationId) { links.push(provider
        .relinkOrganisation(item.id, Box(this.item.organisationId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
