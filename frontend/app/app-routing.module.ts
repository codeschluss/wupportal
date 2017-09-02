import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './admin/login/login.component';
import { MapComponent } from './map/map.component';
import { AdminComponent } from './admin/admin.component';
import { ActivitiesComponent } from './admin/activities/activities.component';
import { OrganisationsComponent } from './admin/organisations/organisations.component';
import { UsersComponent } from './admin/users/users.component';

import { AuthGuard } from './admin/login/auth.guard';

import { SelectivePreloadingStrategy } from './services/selective-preloading-strategy';

const appRoutes: Routes = [
	{ path: '', component: MapComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
	// { path: 'admin/activities', component: ActivitiesComponent, canActivate: [AuthGuard] },
	// { path: 'admin/organisations', component: OrganisationsComponent, canActivate: [AuthGuard] },
	// { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			appRoutes
		)
	],
	exports: [
		RouterModule
	],
	providers: [
		SelectivePreloadingStrategy
	]
})

export class AppRoutingModule { }
