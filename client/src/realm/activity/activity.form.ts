import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data, ResolveData } from '@angular/router';
import { CrudJoiner, CrudResolver, SessionResolver } from '@portal/core';
import { BaseForm, BooleanFieldComponent, ChipListFieldComponent, SelectFieldComponent, StringFieldComponent } from '@portal/mgmt';
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

export class ActivityFormComponent
  extends BaseForm<ActivityProvider, ActivityModel> {

  public static resolve: ResolveData = {
    activity: CrudResolver,
    category: CrudResolver,
    organisation: CrudResolver,
    session: SessionResolver,
    tags: CrudResolver,
    targetGroups: CrudResolver,
  };

  public static resolveConf: Data = {
    activity: CrudJoiner.of(ActivityModel)
      .with(CategoryModel)
      .with(OrganisationModel)
      .with(TagModel)
      .with(TargetGroupModel),
    categoriy: CrudJoiner.of(CategoryModel, false),
    organisation: CrudJoiner.of(OrganisationModel, false),
    tags: CrudJoiner.of(TagModel, false),
    targetGroups: CrudJoiner.of(TargetGroupModel, false)
  };

  public base = 'activity';

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
      options: this.route.snapshot.data.session.accessToken.approvedOrgas
        .map((id) => this.route.snapshot.data.organisation
          .find((organisation) => organisation.id === id)),
      tests: [Validators.required]
    },
    {
      name: 'category',
      input: SelectFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'targetGroups',
      input: SelectFieldComponent,
      multi: true,
    },
    {
      name: 'tags',
      input: ChipListFieldComponent,
      model: TagModel,
    },
    {
      name: 'showUser',
      input: BooleanFieldComponent
    }
  ];

  protected model = this.formed(ActivityModel);

  public constructor(
    protected builder: FormBuilder,
    protected provider: ActivityProvider,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
