import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectivePreloadingStrategy } from '../services/selective-preloading-strategy';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', redirectTo: '' },
			{ path: 'filter/:id', redirectTo: '' },
			{ path: '**', redirectTo: '' },
			{ path: '**', redirectTo: '' },
			{ path: '**', redirectTo: '' },
			{ path: '**', redirectTo: '' },
			{ path: '**', redirectTo: '' },
			{ path: '**', redirectTo: '' }
		]),
	],
	exports: [ RouterModule ],
	providers: [ SelectivePreloadingStrategy ],
})

export class AppRoutingModule { }
