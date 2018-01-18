import { AngularOpenlayersModule } from 'ngx-openlayers';

import { NgModule } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// HttpModule is deprecated
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
	MatButtonModule,
	MatPaginatorIntl,
	MatSidenavModule,
	MatSnackBarModule,
	MatCardModule,
	MatExpansionModule,
	MatIconModule,
	MatTabsModule,
	MatRippleModule,
	MatNativeDateModule,
	MatSelectModule,
	MatPaginatorModule,
	MatFormFieldModule,
	MatSortModule,
	MatDialogModule,
	MatTableModule,
	MatChipsModule,
	MatListModule,
	MatDatepickerModule,
	MatCheckboxModule,
	MatStepperModule,
	MatGridListModule,
	MatAutocompleteModule,
	MatInputModule
} from '@angular/material';

import { AppComponent } from 'app/app.component';
import { AppRouterModule } from 'app/app-router.module';

import { DetailsComponent } from 'app/views/details';
import { FilterComponent } from 'app/views/filter';
import { MappingComponent } from 'app/views/mapping';

import { UserTableComponent } from 'app/views/admin/users/user.table';
import { ActivityTableComponent } from 'app/views/admin/activities/activity.table';
import { OrganisationsTableComponent } from 'app/views/admin/organisations/organisation.table';
import { ProviderTableComponent } from 'app/views/admin/provider/provider.table';
import { ProviderApprovalTableComponent } from 'app/views/admin/provider/provider-approval.table';
import { ProviderRequestTableComponent } from 'app/views/admin/provider/provider-request.table';

import { LoginFormComponent } from 'app/views/admin/login/login.form';
import { AdminComponent } from 'app/views/admin/admin.component';
import { UserFormComponent } from 'app/views/admin/users/user.form';
import { OrganisationFormComponent } from 'app/views/admin/organisations/organisation.form';
import { OrganisationUpdateComponent } from 'app/views/admin/organisations/organisation.update';
import { OrganisationAdminComponent } from 'app/views/admin/organisations/organisation.admin';
import { ActivityFormComponent } from 'app/views/admin/activities/activity.form';
import { RegisterFormComponent } from 'app/views/admin/users/register.form';

import { ActivityService } from 'app/services/activity.service';
import { ProviderService } from 'app/services/provider.service';
import { LocationService } from 'app/services/location';
import { NominatimService } from 'app/services/nominatim';
import { ValidationService } from 'app/services/validation.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';

import { SuburbSelectionComponent } from 'app/views/admin/dialog/popup.suburb.selection';
import { AddressFormComponent } from 'app/views/admin/addresses/address.form';

import { DeleteDialogComponent } from 'app/views/admin/dialog/delete.dialog';
import { DeleteActionComponent } from 'app/views/admin/actions/delete.action';
import { OrganisationSelectionComponent } from 'app/views/admin/dialog/organisation-selection.dialog';
import { AddressAutocompleteComponent } from 'app/views/admin/addresses/address.autocomplete';

import { PaginatorComponent } from 'app/views/admin/table/paginator.table';
import { PaginatorLabels } from 'app/views/admin/table/paginator.labels';

import { ActivityDetailComponent } from 'app/views/admin/activities/activity.detail';
import { OrganisationDetailComponent } from 'app/views/admin/organisations/organisation.detail';



@NgModule({
	bootstrap: [
		AppComponent
	],
	declarations: [
		AppComponent,

		DetailsComponent,
		FilterComponent,
		MappingComponent,
		AddressAutocompleteComponent,

		UserTableComponent,
		OrganisationsTableComponent,
		ActivityTableComponent,
		ProviderTableComponent,
		ProviderApprovalTableComponent,
		ProviderRequestTableComponent,

		LoginFormComponent,
		RegisterFormComponent,
		AdminComponent,
		ActivityFormComponent,
		OrganisationFormComponent,
		OrganisationUpdateComponent,
		OrganisationAdminComponent,
		UserFormComponent,

		ActivityDetailComponent,
		OrganisationDetailComponent,

		SuburbSelectionComponent,
		AddressFormComponent,
		DeleteDialogComponent,
		DeleteActionComponent,
		OrganisationSelectionComponent,

		PaginatorComponent
	],
	imports: [
		AngularOpenlayersModule,
		// HttpModule is deprecated
		HttpModule,
		HttpClientModule,

		BrowserAnimationsModule,
		BrowserModule,
		AppRouterModule,

		MatButtonModule,
		MatExpansionModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatTableModule,
		MatSortModule,
		MatTabsModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatPaginatorModule,
		MatDialogModule,
		MatChipsModule,
		MatListModule,
		MatDatepickerModule,
		MatCheckboxModule,
		MatStepperModule,
		MatGridListModule,
		MatSidenavModule,
		MatAutocompleteModule,
		MatInputModule
	],
	providers: [
		ActivityService,
		ProviderService,
		LocationService,
		NominatimService,
		Constants,
		ValidationService,
		AuthenticationService,
		{ provide: MatPaginatorIntl, useClass: PaginatorLabels }
	],
	entryComponents: [
		SuburbSelectionComponent,
		AddressFormComponent,
		DeleteDialogComponent,
		OrganisationSelectionComponent
	], exports: [
		MatNativeDateModule,
	]
})

export class AppModule { }
