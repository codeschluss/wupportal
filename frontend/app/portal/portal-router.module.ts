import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ActivityService } from 'app/services/activity.service';
import { I18nResolver } from 'app/services/i18n.resolver';
import { TranslationService } from 'app/services/translation.service';
import {
	CategoryService,
	ConfigurationService,
	OrganisationService,
	SuburbService,
	TagService,
	TargetGroupService
} from 'app/services/data.service.factory';

import {
	ActivityResolver,
	CategoryResolver,
	ConfigurationResolver,
	DataResolverFactory,
	OrganisationResolver,
	SuburbResolver,
	TagResolver,
	TargetGroupResolver,
	TranslationResolver
} from 'app/services/data.resolver.factory';

import { AboutPortalComponent } from 'app/portal/about/about.portal.component';
import { PortalComponent } from 'app/portal/portal.component';
import {
	AboutActivityComponent
} from 'app/portal/about/about.activity.component';
import {
	AboutOrganisationComponent
} from 'app/portal/about/about.organisation.component';
import {
	AboutProjectComponent
} from 'app/portal/about/about.project.component';

@NgModule({
	exports: [
		RouterModule
	],
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: PortalComponent,
				resolve: {
					activities: ActivityResolver,
					categories: CategoryResolver,
					configuration: ConfigurationResolver,
					locale: I18nResolver,
					organisations: OrganisationResolver,
					suburbs: SuburbResolver,
					tags: TagResolver,
					targetgroups: TargetGroupResolver,
					translations: TranslationResolver
				},
				children: [
					{
						path: 'home',
						component: AboutProjectComponent
					},
					{
						path: 'about',
						component: AboutPortalComponent
					},
					{
						path: 'activity/:uuid',
						component: AboutActivityComponent,
						resolve: {
							activity: ActivityResolver
						}
					},
					{
						path: 'organisation/:uuid',
						component: AboutOrganisationComponent,
						resolve: {
							organisation: OrganisationResolver
						}
					}
				]
			}
		])
	],
	providers: [
		I18nResolver,
		{
			provide: ActivityResolver,
			deps: [ActivityService],
			useFactory: DataResolverFactory(ActivityResolver)
		},
		{
			provide: CategoryResolver,
			deps: [CategoryService],
			useFactory: DataResolverFactory(CategoryResolver)
		},
		{
			provide: ConfigurationResolver,
			deps: [ConfigurationService],
			useFactory: DataResolverFactory(ConfigurationResolver)
		},
		{
			provide: OrganisationResolver,
			deps: [OrganisationService],
			useFactory: DataResolverFactory(OrganisationResolver)
		},
		{
			provide: SuburbResolver,
			deps: [SuburbService],
			useFactory: DataResolverFactory(SuburbResolver)
		},
		{
			provide: TagResolver,
			deps: [TagService],
			useFactory: DataResolverFactory(TagResolver)
		},
		{
			provide: TargetGroupResolver,
			deps: [TargetGroupService],
			useFactory: DataResolverFactory(TargetGroupResolver)
		},
		{
			provide: TranslationResolver,
			deps: [TranslationService],
			useFactory: DataResolverFactory(TranslationResolver)
		}
	]
})

export class PortalRouterModule { }
