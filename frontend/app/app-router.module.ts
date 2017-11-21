import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MappingComponent } from 'app/views/mapping';

@NgModule({
	imports: [RouterModule.forRoot([
		{ path: '', component: MappingComponent },
		{ path: '**', redirectTo: '' }
	])],
	exports: [RouterModule]
})

export class AppRouterModule { }
