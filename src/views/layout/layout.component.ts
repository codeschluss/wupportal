import { Component } from '@angular/core';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatDialogModule, MatExpansionModule, MatButtonModule } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  styleUrls: ['layout.component.scss'],
  templateUrl: 'layout.component.html'
})

export class LayoutComponent {

	public static readonly imports = [
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatMenuModule,
		MatDialogModule,
		MatExpansionModule,
		MatButtonModule
	];

  public routeLinks: any[] = [];
  public query: string;

  public constructor() {
		this.initGlobalTabs();
  }

  initGlobalTabs(): void {
		this.routeLinks.push(
		{
			label: 'Wupp\'n\'go',
			link: 'home',
			index: 0
		},
		{
			label: 'Veranstaltungen',
			link: 'activities/list',
			index: 1
		},
		{
			label: 'Organisationen',
			link: 'organisations/list',
			index: 2
		},{
			label: 'Wissenswertes',
			link: 'worthknowing',
			index: 3
		},{
			label: 'Blog',
			link: 'blog',
			index: 4
		});
  }

//   Just Prototyping
  getAccountRoutes(): any {
		return [{
			label: 'Persönlicher Daten',
			link: 'admin/',
			index: 0
		},
		{
			label: 'verwaltungsbereich',
			link: 'admin/',
			index: 1
		},
		{
			label: 'Abmelden',
			link: 'admin/',
			index: 2
		}]
	};


}
