import { Component, } from '@angular/core';
import { MatToolbarModule } from '@angular/material';

@Component({
  styleUrls: ['layout.component.scss'],
  templateUrl: 'layout.component.html'
})

export class LayoutComponent {

  public routeLinks: any[] = [];

  public static readonly imports = [
    MatToolbarModule
  ];
  
  public constructor(
  ) { 
		this.initGlobalTabs();
  }

  initGlobalTabs() : void {
		this.routeLinks.push(
		{
			label: 'Wupp\'n\'go',
			link: 'activities/home',
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
			index: 3
		});
  }

}
