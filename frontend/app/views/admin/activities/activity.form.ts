import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Address } from 'app/models/address';
import { Activity } from 'app/models/activity';
import { TargetGroup } from 'app/models/target-group';
import { Tag } from 'app/models/tag';
import { Category } from 'app/models/category';
import { Schedule } from 'app/models/schedule';
import { User } from 'app/models/user';
import { Provider } from 'app/models/provider';

import {
	AddressService,
	DataServiceFactory,
	TagService,
	TargetGroupService,
	CategoryService,
	OrganisationService,
	UserService,
} from 'app/services/data.service.factory';
import { ValidationService } from 'app/services/validation.service';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProviderService } from 'app/services/provider.service';
import { AddressAutocompleteComponent } from 'app/views/admin/addresses/address.autocomplete';
import { SchedulerComponent } from 'app/views/admin/schedules/scheduler.component';
import { ActivityDetailComponent } from 'app/views/admin/activities/activity.detail';
import { ActivityService } from 'app/services/activity.service';
import { Constants } from 'app/services/constants';
import { Object } from 'openlayers';
import { Subscription } from 'rxjs/Subscription';
import { generate } from 'rxjs/observable/generate';

// @Author: Pseipel

@Component({
	selector: 'activity-form',
	templateUrl: 'activity.form.html',
	styleUrls: ['../../../app.component.css'],

})

export class ActivityFormComponent implements OnInit {

	activity: Activity;
	targetGroups: TargetGroup[];
	categories: Category[];
	providers: Provider[] = [];
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	user: User;
	separatorKeysCodes: any[] = [ENTER, COMMA];

	@ViewChild('addressAutocompleteComponent') addressAutocomplete: AddressAutocompleteComponent;
	@ViewChild('schedulerComponent') scheduler: SchedulerComponent;

	constructor(
		private activityService: ActivityService,
		private providerService: ProviderService,
		@Inject(UserService) public userService: DataService,
		@Inject(AddressService) public addressService: DataService,
		@Inject(TagService) private tagService: DataService,
		@Inject(TargetGroupService) private targetGroupService: DataService,
		@Inject(CategoryService) private categoriesService: DataService,
		public authService: AuthenticationService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		private _formBuilder: FormBuilder,
		public validation: ValidationService,
	) {
		this.targetGroupService.getAll().subscribe((targetGroups) => this.targetGroups = targetGroups);
		this.categoriesService.getAll().subscribe((categories) => this.categories = categories);
	}

	ngOnInit(): void {
		this.providerService
			.getByUser(this.authService.currentUser.id)
			.subscribe(providers => providers.map(provider => {
				if (provider.approved) { this.providers.push(provider); }
			}));
		this.route.paramMap
			.switchMap((params: ParamMap) => {
				if (params.get('id') === 'new') {
					return new Observable(observer => observer.next(new Activity({})));
				} else {
					return this.activityService.get(params.get('id'));
				}
			})
			.subscribe(activity => {
				this.activity = new Activity(activity);
				const targetGropuIDs = [];
				this.activity.target_groups.forEach(tg => targetGropuIDs.push(tg.id));

				if (this.activity.provider.id) {
					if (this.providers.indexOf(this.activity.provider) === -1) {
						this.providers.push(this.activity.provider);
					}
				}
				this.firstFormGroup = new FormGroup({
					'providerCtrl': new FormControl(this.activity.provider_id, [
						Validators.required
					]),
					'nameCtrl': new FormControl(this.activity.name, [
						Validators.required
					]),
					'showUserCtrl': new FormControl(this.activity.show_user ? this.activity.show_user : false),
					'descriptionCtrl': new FormControl(this.activity.description),
					'tagsCtrl': new FormControl(''),
					'categoryCtrl': new FormControl(this.activity.category.id, [Validators.required]),
					'targetGroupCtrl': new FormControl(targetGropuIDs)
				});
				this.secondFormGroup = new FormGroup({
					'addressCtrl': new FormControl(new Address(this.activity.address).isValid ?
						new Address(this.activity.address) : '', [Validators.required])
				});
				this.thirdFormGroup = new FormGroup({
					'schedulesCtrl': new FormControl(this.activity.schedules, [Validators.required])
				});

				this.firstFormGroup.get('nameCtrl').valueChanges.subscribe(name => { this.activity.name = name; });
				this.firstFormGroup.get('descriptionCtrl').valueChanges.subscribe(description => { this.activity.description = description; });
				this.firstFormGroup.get('providerCtrl').valueChanges.subscribe(() =>
					this.activity.provider = this.providers.find(provider => provider.id === this.firstFormGroup.get('providerCtrl').value));
				this.firstFormGroup.get('providerCtrl').valueChanges.subscribe(providerID => { this.activity.provider_id = providerID; });
				this.firstFormGroup.get('showUserCtrl').valueChanges.subscribe(showUser => { this.activity.show_user = showUser; });
				this.firstFormGroup.get('categoryCtrl').valueChanges.subscribe(() =>
					this.activity.category = this.categories.find(category => category.id === this.firstFormGroup.get('categoryCtrl').value));
				this.firstFormGroup.get('categoryCtrl').valueChanges.subscribe(catID => { this.activity.category_id = catID; });
				if (this.authService.isSuperUser()) {
					this.userService.get(this.activity.provider.user_id).subscribe(user => {
						this.user = new User(user);
					});
				} else {
					this.user = this.authService.currentUser;
				}
				this.onScheduleChange(this.activity.schedules);
			});
	}

	onScheduleChange(schedules: Schedule[]): void {
		this.activity.schedules = schedules;
		this.thirdFormGroup.get('schedulesCtrl').setValue(this.activity.schedules);
	}

	addTag(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value.trim().toLowerCase();
		if (value.length > 0) {
			const currTag = new Tag();
			currTag.name = value;
			this.activity.tags.push(currTag);
		}
		if (input) {
			input.value = '';
		}
	}

	removeTag(tag: Tag): void {
		const index = this.activity.tags.indexOf(tag);
		if (index >= 0) {
			this.activity.tags.splice(index, 1);
		}
	}

	initCtrl(array: any[]): string[] {
		const ids: string[] = [];
		for (const item of array) {
			ids.push(item.id);
		}
		return ids;
	}

	generateTargetGroupArray(idArray: string[]): void {
		const target_groups = [];
		for (const id of idArray) {
			target_groups.push(this.targetGroups.find(tg => tg.id === id));
		}
		this.activity.target_groups = target_groups;
	}

	handleTags(): Observable<any[]> {
		const observableTagArray: Observable<any>[] = [];
		this.activity.tags.map(tagName => {
			const currTag = tagName;
			observableTagArray.push(this.tagService.add(currTag));
		});
		return Observable.forkJoin(observableTagArray);
	}

	addressSubmit(): void {
		const addressObservable = this.addressAutocomplete.getAddress();
		if (addressObservable) {
			addressObservable.subscribe(addressResponse => {
				const address = new Address(addressResponse);
				this.activity.address = address;
				this.activity.address_id = address.id;
				this.secondFormGroup.get('addressCtrl').setValue(this.activity.address);
			});
		}
	}

	resetAddress(): void {
		this.activity.address = new Address();
		this.secondFormGroup.get('addressCtrl').setValue('');
	}

	onSubmit(): void {
		this.activity.provider = null;
		this.activity.category = null;
		this.activity.address = null;
		this.scheduler.deleteSchedules();
		this.generateTargetGroupArray(this.firstFormGroup.get('targetGroupCtrl').value);
		if (this.activity.tags.length) {
			this.handleTags().subscribe(tags => {
				for (const tag of tags) {
					this.activity.tags.push(tag);
				}
				if (this.activity.id) {
					this.activityService.edit(this.activity).subscribe(() => this.back());
				} else {
					this.activityService.add(this.activity).subscribe(() => this.back());
				}
			});
		} else {
			if (this.activity.id) {
				this.activityService.edit(this.activity).subscribe(() => this.back());
			} else {
				this.activityService.add(this.activity).subscribe(() => this.back());
			}
		}
	}

	back(): void {
		this.location.back();
	}

}

