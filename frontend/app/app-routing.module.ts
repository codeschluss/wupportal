import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './admin/login/login.component';
import { MapComponent } from './map/map.component';
import { AdminComponent } from './admin/admin.component';
import { ActivitiesComponent } from './admin/activities/edit.activities.component';
import { OrganisationsComponent } from './admin/organisations/edit.organisations.component';
import { UsersComponent } from './admin/users/edit.users.component';

import { AuthGuard } from './admin/login/auth.guard';

import { SelectivePreloadingStrategy } from './services/selective-preloading-strategy';

const appRoutes: Routes = [
	{ path: '', component: MapComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
	// redirects not mapped path to landingPage
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
