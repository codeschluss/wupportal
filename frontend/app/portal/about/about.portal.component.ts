import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
	styleUrls: ['about.component.css'],
	templateUrl: 'about.portal.component.html'
})

export class AboutPortalComponent implements OnInit {

	@ViewChild('title')
	public title: ElementRef;

	public showLegal: boolean;

	constructor(
		private domSanitizer: DomSanitizer,
		private iconRegistry: MatIconRegistry
	) { }

	public ngOnInit(): void {
		this.iconRegistry.addSvgIcon('codeschluss', this.domSanitizer
			.bypassSecurityTrustResourceUrl('/imgs/codeschluss.svg'));

		this.iconRegistry.addSvgIcon('kommzent', this.domSanitizer
			.bypassSecurityTrustResourceUrl('/imgs/kommzent.svg'));

		this.iconRegistry.addSvgIcon('transzent', this.domSanitizer
			.bypassSecurityTrustResourceUrl('/imgs/transzent.svg'));
	}

}
