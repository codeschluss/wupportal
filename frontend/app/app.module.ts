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

import { AuthGuard } from 'app/views/admin/login/auth.guard';
import { LoginComponent } from 'app/views/admin/login/login.component';
import { AdminComponent } from 'app/views/admin/admin.component';
import { ActivitiesComponent } from 'app/views/admin/activities/activities.component';
import { UsersTableComponent } from 'app/views/admin/users/users.table';
import { UserEditComponent } from 'app/views/admin/users/user.form.component';
import { OrganisationsComponent } from 'app/views/admin/organisations/organisations.component';
import { OrganisationEditComponent } from 'app/views/admin/organisations/organisation.form.component';
import { ActivityEditComponent } from 'app/views/admin/activities/activity.form.component';

import { ActivityService } from 'app/services/activity';
import { CategoryService } from 'app/services/category';
import { ConfigurationService } from 'app/services/configuration';
import { LocationService } from 'app/services/location';
import { NominatimService } from 'app/services/nominatim';
import { OrganisationService } from 'app/services/organisation';
import { SuburbService } from 'app/services/suburb';
import { TargetGroupService } from 'app/services/target-group';
import { UserService } from 'app/services/user';
import { TagService } from 'app/services/tag';

import { DialogComponent } from 'app/views/common/popup.component';

@NgModule({
	bootstrap: [
		AppComponent
	],
	declarations: [
		AppComponent,

		DetailsComponent,
		FilterComponent,
		MappingComponent,

		LoginComponent,
		AdminComponent,
		ActivitiesComponent,
		ActivityEditComponent,
		OrganisationsComponent,
		OrganisationEditComponent,
		UsersTableComponent,
		UserEditComponent,
		DialogComponent,
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
		CategoryService,
		ConfigurationService,
		LocationService,
		NominatimService,
		OrganisationService,
		SuburbService,
		TargetGroupService,
		UserService,
		TagService,

		AuthGuard
	],
	entryComponents: [
		DialogComponent,
	]
})

export class AppModule { }
