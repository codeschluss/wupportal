import { Component, Inject, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/observable/of';

import { Activity } from 'app/models/activity';

import { Constants } from 'app/services/constants';


@Component({
	selector: 'activity-detail',
	templateUrl: 'activity.detail.html',
	styleUrls: ['../../../app.component.css']
})

export class ActivityDetailComponent {

	@Input() activity: Activity;

	constructor(
		public constants: Constants
	) { }

}
