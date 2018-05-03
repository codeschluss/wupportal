import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { AboutComponent } from 'app/portal/about/about.component';

@Component({
	styleUrls: ['about.component.css'],
	templateUrl: 'about.portal.component.html'
})

export class AboutPortalComponent extends AboutComponent {

	constructor(
		private domSanitizer: DomSanitizer,
		private iconRegistry: MatIconRegistry,
		protected route: ActivatedRoute
	) {
		super(route);
	}

	public ngOnInit(): void {
		this.iconRegistry.addSvgIcon('codeschluss', this.domSanitizer
			.bypassSecurityTrustResourceUrl('/imgs/codeschluss.svg'));

		this.iconRegistry.addSvgIcon('kommzent', this.domSanitizer
			.bypassSecurityTrustResourceUrl('/imgs/kommzent.svg'));

		this.iconRegistry.addSvgIcon('transzent', this.domSanitizer
			.bypassSecurityTrustResourceUrl('/imgs/transzent.svg'));
	}

}
