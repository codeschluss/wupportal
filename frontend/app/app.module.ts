import { AngularOpenlayersModule } from 'ngx-openlayers';

import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from 'app/app.component';
// import { AppRouterModule } from 'app/app-router.module';

import { AdminComponent } from 'app/components/admin';
import { DetailsComponent } from 'app/components/details';
import { FilterComponent } from 'app/components/filter';
import { MappingComponent } from 'app/components/mapping';

import { ActivityService } from 'app/services/activity';
import { CategoryService } from 'app/services/category';
import { ConfigurationService } from 'app/services/configuration';
import { LocationService } from 'app/services/location';
import { NominatimService } from 'app/services/nominatim';
import { OrganisationService } from 'app/services/organisation';
import { SuburbService } from 'app/services/suburb';
import { TargetGroupService } from 'app/services/target-group';
import { UserService } from 'app/services/user';

@NgModule({
	bootstrap: [
		AppComponent
	],
	declarations: [
		AppComponent,

		AdminComponent,
		DetailsComponent,
		FilterComponent,
		MappingComponent
	],
	imports: [
		AngularOpenlayersModule,

		HttpModule,

		BrowserAnimationsModule,
		BrowserModule,

		MatButtonModule,
		MatExpansionModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatTabsModule

		// AppRouterModule
	],
	providers: [
		ActivityService,
		CategoryService,
		ConfigurationService,
		LocationService,
		NominatimService,
		OrganisationService,
		SuburbService,
		TargetGroupService,
		UserService
	]
})

export class AppModule { }
