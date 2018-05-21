import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
	styleUrls: ['about.component.css'],
	templateUrl: 'about.portal.component.html'
})

export class AboutPortalComponent implements OnInit {

	@ViewChild('header')
	public header: ElementRef;

	public showLegal: boolean;

	constructor(
		private domSanitizer: DomSanitizer,
		private iconRegistry: MatIconRegistry,
		private route: ActivatedRoute
	) { }

	public ngOnInit(): void {
		this.iconRegistry.addSvgIcon('kommzent', this.domSanitizer
			.bypassSecurityTrustResourceUrl('/imgs/kommzent.svg'));

		this.iconRegistry.addSvgIcon('transzent', this.domSanitizer
			.bypassSecurityTrustResourceUrl('/imgs/transzent.svg'));

		this.showLegal = this.route.snapshot.fragment === 'legal';
	}

}
