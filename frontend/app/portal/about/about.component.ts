import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ })

export abstract class AboutComponent implements OnInit {

	@ViewChild('title')
	public title: ElementRef;

	constructor(
		protected route: ActivatedRoute
	) { }

	public abstract ngOnInit(): void;

}
