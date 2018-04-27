import { ModuleWithProviders } from '@angular/core';
import {
	CanActivate,
	RouterModule,
	Routes
} from '@angular/router';

import {
	ActivityResolver,
	ConfigurationResolver,
	OrganisationResolver
} from 'app/services/data.resolver.factory';

import {
	AboutActivityComponent
} from 'app/portal/about/about.activity.component';
import {
	AboutOrganisationComponent
} from 'app/portal/about/about.organisation.component';
import { PortalComponent } from 'app/portal/portal.component';

const routes: Routes = [
	{
		path: '',
		component: PortalComponent,
		resolve: {
			activities: ActivityResolver,
			configuration: ConfigurationResolver
		},
		children: [
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
	},
];

export const PortalRouter: ModuleWithProviders = RouterModule.forChild(routes);
