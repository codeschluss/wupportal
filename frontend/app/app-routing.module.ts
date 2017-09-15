import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './admin/login/login.component';
import { MapComponent } from './map/map.component';
import { ActivityDetailComponent } from './map/activityDetail/activity-detail.component';
import { AdminComponent } from './admin/admin.component';

import { AuthGuard } from './admin/login/auth.guard';

import { SelectivePreloadingStrategy } from './services/selective-preloading-strategy';

const appRoutes: Routes = [
	{ path: '', component: MapComponent },
	{ path: 'login', component: LoginComponent },
	// { path: 'activity-details', component: ActivityDetailComponent },
	// { path: 'organisation-details', component: LoginComponent },
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
