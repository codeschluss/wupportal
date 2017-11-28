import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MappingComponent } from 'app/views/mapping';
import { LoginComponent } from 'app/views/admin/login/login.component';
import { AdminComponent } from 'app/views/admin/admin.component';
import { UserFormComponent } from 'app/views/admin/users/user.form';
import { OrganisationFormComponent } from 'app/views/admin/organisations/organisation.form';
import { ActivityFormComponent } from 'app/views/admin/activities/activity.form';
import { ActivityTableComponent } from 'app/views/admin/activities/activity.table';
import { UsersTableComponent } from 'app/views/admin/users/users.table';
import { OrganisationsTableComponent } from 'app/views/admin/organisations/organisation.table';
import { AuthGuard } from 'app/views/admin/login/auth.guard';

@NgModule({
	imports: [RouterModule.forRoot([
		{ path: '', component: MappingComponent },
		{ path: 'login', component: LoginComponent },
		{
			path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
				{ path: '', component: OrganisationsTableComponent, outlet: 'table' },
				{ path: 'activities', component: ActivityTableComponent, outlet: 'table' },
				{ path: 'users', component: UsersTableComponent, outlet: 'table' },
				{ path: 'organisations', component: OrganisationsTableComponent, outlet: 'table' },
				{ path: 'account', component: UserFormComponent, outlet: 'table' }
			]
		},
		{ path: 'organisation/edit/:id', component: OrganisationFormComponent },
		{ path: 'activity/edit/:id', component: ActivityFormComponent },

		// { path: '**', redirectTo: '' }
	])],
	exports: [RouterModule]
})

export class AppRouterModule { }
