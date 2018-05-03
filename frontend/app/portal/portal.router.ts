import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { RouterModule } from '@angular/router';

import { ActivityService } from 'app/services/activity.service';
import { TranslationService } from 'app/services/translation.service';
import { UserService } from 'app/services/user.service';
import {
	ActivityResolver,
	CategoryResolver,
	ConfigurationResolver,
	DataResolverFactory,
	OrganisationResolver,
	TranslationResolver,
	SuburbResolver,
	TagResolver,
	TargetGroupResolver
} from 'app/services/data.resolver.factory';
import {
	CategoryService,
	ConfigurationService,
	DataServiceFactory,
	OrganisationService,
	SuburbService,
	TagService,
	TargetGroupService
} from 'app/services/data.service.factory';

import { AboutPortalComponent } from 'app/portal/about/about.portal.component';
import { PortalComponent } from 'app/portal/portal.component';
import {
	AboutActivityComponent
} from 'app/portal/about/about.activity.component';
import {
	AboutOrganisationComponent
} from 'app/portal/about/about.organisation.component';

export const PortalRouter: ModuleWithProviders = RouterModule.forChild([
	{
		path: '',
		component: PortalComponent,
		resolve: {
			categories: CategoryResolver,
			configuration: ConfigurationResolver,
			organisations: OrganisationResolver,
			suburbs: SuburbResolver,
			tags: TagResolver,
			targetgroups: TargetGroupResolver,
			translations: TranslationResolver
		},
		children: [
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
]);

PortalRouter.providers.push([
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
]);
