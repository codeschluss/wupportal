import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigurationService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';


@Component({
	selector: 'app-root',
	styleUrls: ['app.component.css'],
	templateUrl: 'app.component.html'
})

export class AppComponent {
	public constructor(
		private titleService: Title,
		@Inject(ConfigurationService) private configurationService: DataService) {
		this.configurationService.getAll().subscribe(
			items => { this.setTitle(items.find(item => item.item === 'portalName').value); }
		);
	}

	public setTitle(newTitle: string): void {
		this.titleService.setTitle(newTitle);
	}

}
