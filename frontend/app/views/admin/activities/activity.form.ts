import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatChipInputEvent, MatIconModule } from '@angular/material';
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
	OrganisationService
} from 'app/services/data.service.factory';
import { ValidationService } from 'app/services/validation.service';
import { DataService } from 'app/services/data.service';
import { UserService } from 'app/services/user.service';
import { ProviderService } from 'app/services/provider.service';

import { AddressAutocompleteComponent } from 'app/views/admin/addresses/address.autocomplete';
import { SchedulerComponent } from 'app/views/admin/schedules/scheduler.component';
import { ActivityDetailComponent } from 'app/views/admin/activities/activity.detail';
import { ActivityService } from 'app/services/activity.service';
import { Constants } from 'app/services/constants';
import { Subscription } from 'rxjs/Subscription';
import { generate } from 'rxjs/observable/generate';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';
import { TranslatableFieldsComponent } from 'app/views/admin/translations/translatable.form';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { TranslationService } from 'app/services/translation.service';

// @Author: Pseipel

@Component({
	selector: 'activity-form',
	templateUrl: 'activity.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css'],

})

export class ActivityFormComponent implements OnInit {

	activity: Activity;
	targetGroups: TargetGroup[];
	categories: Category[];
	providers: Provider[] = [];
	baseDataFormGroup: FormGroup;
	addressFormGroup: FormGroup;
	schedulesFormGroup: FormGroup;
	user: User;
	faCheck: IconDefinition = faCheck;
	faTrashAlt: IconDefinition = faTrashAlt;

	separatorKeysCodes: any[] = [ENTER, COMMA];

	@ViewChild('addressAutocompleteComponent') addressAutocomplete: AddressAutocompleteComponent;
	@ViewChild('schedulerComponent') scheduler: SchedulerComponent;
	@ViewChild('translatableFieldsComponent') translatableFieldsComponent: TranslatableFieldsComponent;

	constructor(
		private activityService: ActivityService,
		private providerService: ProviderService,
		public userService: UserService,
		@Inject(AddressService) public addressService: DataService,
		@Inject(TagService) private tagService: DataService,
		@Inject(TargetGroupService) private targetGroupService: DataService,
		@Inject(CategoryService) private categoriesService: DataService,
		private translationService: TranslationService,
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
		if (this.userService.isSuperUser()) {
			this.providerService.getAll().subscribe(providers => providers.map(provider => {
				if (provider.approved) { this.providers.push(provider); }
			}));
		} else {
			this.providerService
				.getByUser(this.userService.currentUser.id)
				.subscribe(providers => providers.map(provider => {
					if (provider.approved) { this.providers.push(provider); }
				}));
		}
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
				this.baseDataFormGroup = new FormGroup({
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
				this.addressFormGroup = new FormGroup({
					'addressCtrl': new FormControl(new Address(this.activity.address).isValid ?
						new Address(this.activity.address) : '', [Validators.required])
				});
				this.schedulesFormGroup = new FormGroup({
					'schedulesCtrl': new FormControl(this.activity.schedules, [Validators.required])
				});

				this.baseDataFormGroup.get('nameCtrl').valueChanges.subscribe(name => { this.activity.name = name; });
				this.baseDataFormGroup.get('descriptionCtrl').valueChanges.subscribe(description => { this.activity.description = description; });
				this.baseDataFormGroup.get('providerCtrl').valueChanges.subscribe(() =>
					this.activity.provider = this.providers.find(provider => provider.id === this.baseDataFormGroup.get('providerCtrl').value));
				this.baseDataFormGroup.get('providerCtrl').valueChanges.subscribe(providerID => { this.activity.provider_id = providerID; });
				this.baseDataFormGroup.get('showUserCtrl').valueChanges.subscribe(showUser => { this.activity.show_user = showUser; });
				this.baseDataFormGroup.get('categoryCtrl').valueChanges.subscribe(() =>
					this.activity.category = this.categories.find(category => category.id === this.baseDataFormGroup.get('categoryCtrl').value));
				this.baseDataFormGroup.get('categoryCtrl').valueChanges.subscribe(catID => { this.activity.category_id = catID; });
				if (this.userService.isSuperUser()) {
					this.userService.get(this.activity.provider.user_id).subscribe(user => {
						this.user = new User(user);
					});
				} else {
					this.user = this.userService.currentUser;
				}
				this.onScheduleChange(this.activity.schedules);
			});
	}

	onScheduleChange(schedules: Schedule[]): void {
		this.activity.schedules = schedules;
		this.schedulesFormGroup.get('schedulesCtrl').setValue(this.activity.schedules);
	}

	addTag(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value.trim().toLowerCase();
		if (value.length > 0
			&& !this.activity.tags.find(tag => tag.name === value)
		) {
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
		this.activity.tags.forEach(currTag => {
			observableTagArray.push(this.tagService.add(currTag));
		});
		this.activity.tags = [];
		return Observable.forkJoin(observableTagArray);
	}

	addressSubmit(): void {
		const addressObservable = this.addressAutocomplete.getAddress();
		if (addressObservable) {
			addressObservable.subscribe(addressResponse => {
				const address = new Address(addressResponse);
				this.activity.address = address;
				this.activity.address_id = address.id;
				this.addressFormGroup.get('addressCtrl').setValue(this.activity.address);
			});
		}
	}

	resetAddress(): void {
		this.activity.address = new Address();
		this.addressFormGroup.get('addressCtrl').setValue('');
	}

	stepperValueChange(event: StepperSelectionEvent): void {
		if (event.selectedIndex === 4) {
			this.saveTranslations();
		}
	}

	saveTranslations(): void {
		const translationsSubscriber = this.translatableFieldsComponent.getTranslations();
		if (translationsSubscriber) {
			translationsSubscriber.subscribe(translationsRetrieved => {
				// if empty cake returns an empty array
				if (Array.isArray(this.activity._translations)) {
					this.activity._translations = {};
				}
				for (const languageCode of Object.keys(this.activity._translations)) {
					if (!this.activity._translations[languageCode]) {
						this.activity._translations[languageCode] = translationsRetrieved[languageCode];
					} else {
						for (const attribute of Object.keys(this.activity._translations[languageCode])) {
							if (!this.activity._translations[languageCode][attribute]) {
								if (translationsRetrieved[languageCode][attribute]) {
									this.activity._translations[languageCode][attribute] = translationsRetrieved[languageCode][attribute];
								}
							}
						}
					}
				}
			});
		}

		onSubmit(): void {
			this.activity.provider = null;
			this.activity.category = null;
			this.activity.address = null;
			this.scheduler.deleteSchedules();
			this.generateTargetGroupArray(this.baseDataFormGroup.get('targetGroupCtrl').value);
			if(this.activity.tags.length) {
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
				if(this.activity.id) {
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

