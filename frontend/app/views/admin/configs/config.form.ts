import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/services/authentication.service';
import { NgModel, NgForm } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from 'app/services/data.service.factory';
import { Constants } from 'app/services/constants';
import { Configuration } from '../../../models/configuration';
import { DataService } from 'app/services/data.service';
import { DataServiceFactory } from '../../../services/data.service.factory';

// @Author: Pseipel

@Component({
	selector: 'config-form',
	templateUrl: 'config.form.html',
	styleUrls: ['../../../app.component.css']
})

export class ConfigFormComponent implements OnInit {

	private configurations: Configuration[];

	constructor(
		private location: Location,
		public constants: Constants,
		@Inject(ConfigurationService) private configurationService: DataService,
	) {
	}

	ngOnInit(): void {
		this.configurationService.getAll().subscribe(configs => { this.configurations = configs; });
	}

	mergeConfigs(): Observable<any[]> {
		const observableConfigArray: Observable<any>[] = [];
		this.configurations.map(config =>
			observableConfigArray.push(this.configurationService.edit(config))
		);
		return Observable.forkJoin(observableConfigArray);
	}


	onSubmit(): void {
		this.mergeConfigs().subscribe(() => this.back());
	}

	back(): void {
		this.location.back();
	}

}

