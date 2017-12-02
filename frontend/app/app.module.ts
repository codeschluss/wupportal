import { AngularOpenlayersModule } from 'ngx-openlayers';

import { NgModule } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// HttpModule is deprecated
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatSortModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

import { AppComponent } from 'app/app.component';
import { AppRouterModule } from 'app/app-router.module';

import { DetailsComponent } from 'app/views/details';
import { FilterComponent } from 'app/views/filter';
import { MappingComponent } from 'app/views/mapping';

import { LoginFormComponent } from 'app/views/admin/login/login.form';
import { AdminComponent } from 'app/views/admin/admin.component';
import { ActivityTableComponent } from 'app/views/admin/activities/activity.table';
import { UsersTableComponent } from 'app/views/admin/users/users.table';
import { UserFormComponent } from 'app/views/admin/users/user.form';
import { OrganisationsTableComponent } from 'app/views/admin/organisations/organisation.table';
import { OrganisationFormComponent } from 'app/views/admin/organisations/organisation.form';
import { ActivityFormComponent } from 'app/views/admin/activities/activity.form';

import { ActivityService } from 'app/services/activity';
import { LocationService } from 'app/services/location';
import { NominatimService } from 'app/services/nominatim';
import { ValidationService } from 'app/services/validation.service';
import { AuthenticationService } from 'app/services/authentication.service';

import { Constants } from 'app/views/common/constants';

import { DialogComponent } from 'app/views/common/popup.component';
import { SuburbSelectionComponent } from 'app/views/common/popup.suburb.selection';

@NgModule({
	bootstrap: [
		AppComponent
	],
	declarations: [
		AppComponent,

		DetailsComponent,
		FilterComponent,
		MappingComponent,

		LoginFormComponent,
		AdminComponent,
		ActivityTableComponent,
		ActivityFormComponent,
		OrganisationsTableComponent,
		OrganisationFormComponent,
		UsersTableComponent,
		UserFormComponent,
		DialogComponent,
		SuburbSelectionComponent
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

	],
	providers: [
		ActivityService,
		LocationService,
		NominatimService,
		Constants,
		ValidationService,
		AuthenticationService
	],
	entryComponents: [
		DialogComponent,
		SuburbSelectionComponent
	]
})

export class AppModule { }
