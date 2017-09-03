import { Component, OnInit } from '@angular/core';
import { MapBrowserEvent, Feature } from 'openlayers';

import { ActivityService } from './services/activity.service';
import { ConfigurationService } from './services/configuration.service';
import { Service } from './services/service';

import { Activity } from './common/model/activity';
import { Configuration } from './common/model/configuration';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [Service, ConfigurationService, ActivityService]
})

export class AppComponent { }
