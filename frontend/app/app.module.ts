import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AngularOpenlayersModule } from 'ngx-openlayers';
import {
	MdCardModule, MdSidenavModule, MdButtonModule, MdCheckboxModule, MdTabsModule, MdInputModule, MdTableModule,
	MdPaginatorModule, MdAutocompleteModule, MdChipsModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ActivityDetailComponent } from './map/activityDetail/activity-detail.component';
import { ActivitySummaryComponent } from './map/activitySummary/activity-summary.component';
import { CheckboxAreaComponent } from './common/components/checkboxArea/checkbox-area.component';

import { Service } from './services/service';
import { ActivityService } from './services/activity.service';
import { ConfigurationService } from './services/configuration.service';
import { CategoryService } from './services/category.service';
import { SuburbService } from './services/suburb.service';
import { TargetgroupService } from './services/targetgroup.service';
import { UserService } from './services/user.service';
import { OrgaService } from './services/organisation.service';
import { NominatimService } from './services/nominatim.service';

import { AuthGuard } from './admin/login/auth.guard';

import { LoginComponent } from './admin/login/login.component';
import { MapComponent } from './map/map.component';
import { AdminComponent } from './admin/admin.component';
import { ActivitiesComponent } from './admin/activities/edit.activities.component';
import { UsersComponent } from './admin/users/edit.users.component';
import { OrganisationsComponent } from './admin/organisations/edit.organisations.component';


@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		ActivityDetailComponent,
		ActivitySummaryComponent,
		CheckboxAreaComponent,
		LoginComponent,
		AdminComponent,
		ActivitiesComponent,
		OrganisationsComponent,
		UsersComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		BrowserAnimationsModule,
		AngularOpenlayersModule,
		AppRoutingModule,
		MdCardModule,
		MdSidenavModule,
		MdButtonModule,
		MdCheckboxModule,
		MdTabsModule,
		MdInputModule,
		MdTableModule,
		MdPaginatorModule,
		MdAutocompleteModule,
		MdChipsModule,
		ReactiveFormsModule
	],
	providers: [
		Service,
		ActivityService,
		ConfigurationService,
		CategoryService,
		SuburbService,
		TargetgroupService,
		AuthGuard,
		UserService,
		OrgaService,
		NominatimService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
