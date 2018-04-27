import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
	MatButtonModule,
	MatCardModule,
	MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSidenavModule,
	MatSnackBar,
	MatTabsModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import * as fas from '@fortawesome/free-solid-svg-icons';

import { AngularOpenlayersModule } from 'ngx-openlayers';

import { ActivityService } from 'app/services/activity.service';
import { UserService } from 'app/services/user.service';
import {
	ActivityResolver,
	ConfigurationResolver,
	DataResolverFactory,
	OrganisationResolver
} from 'app/services/data.resolver.factory';
import {
	ConfigurationService,
	DataServiceFactory,
	OrganisationService
} from 'app/services/data.service.factory';

import {
	ActivityDialogComponent
} from 'app/portal/dialogs/activity.dialog.component';
import { PortalRouter } from 'app/portal/portal.router';

import {
	AboutActivityComponent
} from 'app/portal/about/about.activity.component';
import {
	AboutOrganisationComponent
} from 'app/portal/about/about.organisation.component';
import { MappingComponent } from 'app/portal/mapping/mapping.component';
import { PortalComponent } from 'app/portal/portal.component';
import { SearchComponent } from 'app/portal/search/search.component';

fontawesome.add(
	fas.faAngleDown,
	fas.faAngleUp,
	fas.faComments,
	// fas.faEllipsisV,
	fas.faListAlt,
	fas.faLocationArrow,
	fas.faMapMarkerAlt,
	fas.faPlus,
	fas.faUser
);

@NgModule({
	declarations: [
		AboutActivityComponent,
		AboutOrganisationComponent,
		ActivityDialogComponent,
		MappingComponent,
		PortalComponent,
		SearchComponent
	],
	entryComponents: [
		ActivityDialogComponent
	],
	imports: [
		AngularOpenlayersModule,
		CommonModule,
		FontAwesomeModule,
		PortalRouter,

		MatButtonModule,
		MatCardModule,
		MatDialogModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatSidenavModule,
		MatTabsModule
	],
	providers: [
		ActivityService,
		{
			provide: ActivityResolver,
			deps: [ActivityService],
			useFactory: DataResolverFactory(ActivityResolver)
		},
		{
			provide: ConfigurationService,
			deps: [HttpClient, UserService, MatSnackBar],
			useFactory: DataServiceFactory(ConfigurationService)
		},
		{
			provide: ConfigurationResolver,
			deps: [ConfigurationService],
			useFactory: DataResolverFactory(ConfigurationResolver)
		},
		{
			provide: OrganisationService,
			deps: [HttpClient, UserService, MatSnackBar],
			useFactory: DataServiceFactory(OrganisationService)
		},
		{
			provide: OrganisationResolver,
			deps: [OrganisationService],
			useFactory: DataResolverFactory(OrganisationResolver)
		},
		UserService
	]
})

export class PortalModule { }
