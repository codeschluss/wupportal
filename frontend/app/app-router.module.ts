import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from 'app/views/admin/login/login.form';
import { AdminComponent } from 'app/views/admin/admin.component';
import { UserFormComponent } from 'app/views/admin/users/user.form';
import { OrganisationFormComponent } from 'app/views/admin/organisations/organisation.form';
import { OrganisationAdminComponent } from 'app/views/admin/organisations/organisation.admin';
import { ActivityFormComponent } from 'app/views/admin/activities/activity.form';
import { ActivityTableComponent } from 'app/views/admin/activities/activity.table';
import { UserTableComponent } from 'app/views/admin/users/user.table';
import { AddressTableComponent } from 'app/views/admin/addresses/address.table';
import { AddressFormComponent } from 'app/views/admin/addresses/address.form';
import { OrganisationsTableComponent } from 'app/views/admin/organisations/organisation.table';
import { ConfigFormComponent } from 'app/views/admin/configs/config.form';
import { TagFormComponent } from 'app/views/admin/configs/tag.form';
import { RegisterFormComponent } from 'app/views/admin/users/register.form';
import { AuthGuardService } from './services/authguard.service';
import { ForgottenPasswordFormComponent } from './views/admin/users/forgotten.password';
import { CategoryFormComponent } from './views/admin/configs/category.form';
import { TargetGroup } from './models/target-group';
import { TargetGroupFormComponent } from './views/admin/configs/targetgroup.form';

@NgModule({
	imports: [RouterModule.forRoot([
		{ path: '', loadChildren: 'app/portal/portal.module#PortalModule' },
		{ path: 'login', component: LoginFormComponent },
		{ path: 'register', component: RegisterFormComponent },
		{ path: 'password', component: ForgottenPasswordFormComponent },
		{
			path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], children: [
				{ path: '', redirectTo: '/admin/(table:activities)', pathMatch: 'full' },
				{ path: 'activities', component: ActivityTableComponent, outlet: 'table' },
				{ path: 'users', component: UserTableComponent, canActivate: [AuthGuardService], outlet: 'table' },
				{ path: 'addresses', component: AddressTableComponent, canActivate: [AuthGuardService], outlet: 'table' },
				{ path: 'configurations', component: ConfigFormComponent, canActivate: [AuthGuardService], outlet: 'table' },
				{ path: 'organisations', component: OrganisationsTableComponent, outlet: 'table' },
				{ path: 'organisation-admin/:id', component: OrganisationAdminComponent, canActivate: [AuthGuardService], outlet: 'table' },
				{ path: 'account', component: UserFormComponent, outlet: 'table' },
				{ path: 'activity-edit/:id', component: ActivityFormComponent, canActivate: [AuthGuardService], outlet: 'table' },
				{ path: 'organisation-edit/:id', component: OrganisationFormComponent, canActivate: [AuthGuardService], outlet: 'table' },
				{ path: 'address-edit/:id', component: AddressFormComponent, canActivate: [AuthGuardService], outlet: 'table' },
				{ path: 'tag-edit/:id', component: TagFormComponent, canActivate: [AuthGuardService], outlet: 'table' },
				{ path: 'category-edit/:id', component: CategoryFormComponent, canActivate: [AuthGuardService], outlet: 'table' },
				{ path: 'targetgroup-edit/:id', component: TargetGroupFormComponent, canActivate: [AuthGuardService], outlet: 'table' }
			]
		},
		{ path: '**', redirectTo: '/', pathMatch: 'full' }
	])],
	exports: [RouterModule]
})

export class AppRouterModule { }
