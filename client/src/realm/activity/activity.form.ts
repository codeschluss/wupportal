import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { Box } from '@portal/core';
import { BaseForm, ChipListFieldComponent, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { ActivityModel } from './activity.model';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
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
          <i18n i18n="@@title">title</i18n>
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

export class ActivityFormComponent extends BaseForm<ActivityModel> {

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
      type: 'tel'
    },
    {
      name: 'mail',
      input: StringFieldComponent,
      tests: [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
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

  public persist(): Observable<any> {
    this.item.addressId = this.group.get('address').value.id;
    this.item.categoryId = this.group.get('category').value.id;
    this.item.organisationId = this.group.get('organisation').value.id;

    return super.persist().pipe(
      mergeMap((item) => this.tokenProvider.refresh().pipe(map(() => item)))
    );
  }

  protected ngPostInit(): void {
    this.group.valueChanges.subscribe(() => this.validate());

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
    const provider = this.model['provider'];
    const schedules = this.updated('schedules');
    const tags = this.updated('tags');
    const targets = this.updated('targetGroups');

    const links = [
      ...schedules.add.map((s) => provider.pasteSchedules(item.id, [s])),
      ...schedules.del.map((s) => provider.unlinkSchedule(item.id, s.id)),
      ...tags.add.map((t) => provider.pasteTags(item.id, [t])),
      ...tags.del.map((t) => provider.unlinkTag(item.id, t.id)),
      ...targets.add.map((t) => provider.linkTargetGroups(item.id, [t.id])),
      ...targets.del.map((t) => provider.unlinkTargetGroup(item.id, t.id)),
    ];

    if (this.item.id) {
      const addrId = this.item.address && this.item.address.id;
      const catId = this.item.category && this.item.category.id;
      const orgaId = this.item.organisation && this.item.organisation.id;

      links.push(
        addrId === this.item.addressId ? of(null) : provider
          .relinkAddress(item.id, Box(this.item.addressId)),
        catId === this.item.categoryId ? of(null) : provider
          .relinkCategory(item.id, Box(this.item.categoryId)),
        orgaId === this.item.organisationId ? of(null) : provider
          .relinkOrganisation(item.id, Box(this.item.organisationId))
      );
    }

    return forkJoin([of(item), ...links]).pipe(map((items) => items.shift()));
  }

  private validate(): void {
    const either = ['mail', 'phone']
      .map((e) => this.group.get(e)).filter(Boolean);

    either.some((e) => e && e.value)
      ? either.forEach((e) => e.updateValueAndValidity({ emitEvent: false }))
      : either.forEach((e) => e.setErrors({ either: true }));
  }

}
