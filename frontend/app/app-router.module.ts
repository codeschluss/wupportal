import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MappingComponent } from 'app/views/mapping';
import { LoginFormComponent } from 'app/views/admin/login/login.form';
import { AdminComponent } from 'app/views/admin/admin.component';
import { UserFormComponent } from 'app/views/admin/users/user.form';
import { OrganisationFormComponent } from 'app/views/admin/organisations/organisation.form';
import { OrganisationAdminComponent } from 'app/views/admin/organisations/organisation.admin';
import { ActivityFormComponent } from 'app/views/admin/activities/activity.form';
import { ActivityTableComponent } from 'app/views/admin/activities/activity.table';
import { UserTableComponent } from 'app/views/admin/users/user.table';
import { OrganisationsTableComponent } from 'app/views/admin/organisations/organisation.table';
import { AuthenticationService } from 'app/services/authentication.service';
import { RegisterFormComponent } from 'app/views/admin/users/register.form';

@NgModule({
	imports: [RouterModule.forRoot([
		{ path: '', component: MappingComponent },
		{ path: 'login', component: LoginFormComponent },
		{ path: 'register', component: RegisterFormComponent },
		{
			path: 'admin', component: AdminComponent, canActivate: [AuthenticationService], children: [
				{ path: '', component: OrganisationsTableComponent, outlet: 'table' },
				{ path: 'activities', component: ActivityTableComponent, outlet: 'table' },
				{ path: 'users', component: UserTableComponent, canActivate: [AuthenticationService], outlet: 'table' },
				{ path: 'organisations', component: OrganisationsTableComponent, outlet: 'table' },
				{ path: 'organisation-admin/:id', component: OrganisationAdminComponent, canActivate: [AuthenticationService], outlet: 'table' },
				{ path: 'account', component: UserFormComponent, outlet: 'table' }
			]
		},
		{ path: 'activity/edit/:id', component: ActivityFormComponent },
		{ path: 'organisation/edit/:id', component: OrganisationFormComponent }

		// { path: '**', redirectTo: '' }
	])],
	exports: [RouterModule]
})

export class AppRouterModule { }
