import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, BooleanFieldComponent, ChipListFieldComponent, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { ActivityModel } from './activity.model';
import { ActivityProvider } from './activity.provider';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <i18n #name i18n="@@title">title</i18n>
    <i18n #description i18n="@@description">description</i18n>
    <i18n #organisation i18n="@@organisation">organisation</i18n>
    <i18n #category i18n="@@category">category</i18n>
    <i18n #targetGroups i18n="@@targetGroups">targetGroups</i18n>
    <i18n #tags i18n="@@tags">tags</i18n>
    <i18n #showUser i18n="@@showUser">showUser</i18n>
  `)
})

export class ActivityFormComponent extends BaseForm<ActivityModel> {

  public fields = [
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
      name: 'organisation',
      input: SelectFieldComponent,
      model: OrganisationModel,
      tests: [Validators.required]
    },
    {
      name: 'category',
      input: SelectFieldComponent,
      model: CategoryModel,
      tests: [Validators.required]
    },
    {
      name: 'targetGroups',
      input: SelectFieldComponent,
      model: TargetGroupModel,
      multi: true
    },
    {
      name: 'tags',
      input: ChipListFieldComponent,
      model: TagModel
    },
    {
      name: 'showUser',
      input: BooleanFieldComponent
    }
  ];

  public model = ActivityModel;

  public constructor(
    protected builder: FormBuilder,
    protected provider: ActivityProvider,
    protected route: ActivatedRoute
  ) {
    super();
  }

  protected ngPostInit(): void {
    const options = this.route.snapshot.data.session.accessToken
      .approvedOrgas.map((id) => this.route.snapshot.data.organisation
        .find((organisation) => organisation.id === id));

    this.fields = this.fields.map((field) => field.name === 'organisations'
      ? Object.assign(field, { options: options }) : field);
  }

}
