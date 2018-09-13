import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
	styleUrls: ['about.component.css'],
	templateUrl: 'about.project.component.html'
})

export class AboutProjectComponent implements OnInit, OnDestroy {

	@ViewChild('header')
	public header: ElementRef;

	private width: string;

	constructor(
		private host: ElementRef
	) { }

	public ngOnInit(): void {
		const parent = this.host.nativeElement.parentElement;
		this.width = window.getComputedStyle(parent).maxWidth;
		parent.style.maxWidth = '100%';
	}

	public ngOnDestroy(): void {
		this.host.nativeElement.parentElement.style.maxWidth = this.width;
	}

}
