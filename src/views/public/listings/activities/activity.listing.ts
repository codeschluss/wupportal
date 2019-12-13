import { AfterViewInit, Component, ElementRef, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';
import { Params, Route } from '@angular/router';
import { Arr, CrudJoiner, CrudResolver, ReadParams } from '@wooportal/core';
import * as ColorConvert from 'color-convert';
import { merge } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { CategoryModel } from '../../../../realm/models/category.model';
import { SuburbModel } from '../../../../realm/models/suburb.model';
import { TargetGroupModel } from '../../../../realm/models/target-group.model';
import { MapsConnection } from '../../../maps/maps.connection';
import { ActivityCardComponent } from '../../cards/activity/activity.card';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['../base.listing.scss', 'activity.listing.scss'],
  templateUrl: 'activity.listing.html'
})

export class ActivityListingComponent
  extends BaseListing<ActivityModel> implements AfterViewInit {

  public blank: boolean = true;

  public categoryCtrl: FormControl = new FormControl();

  public suburbCtrl: FormControl = new FormControl();

  public targetGroupCtrl: FormControl = new FormControl();

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel, {
    current: true
  }).with('address').yield('suburb')
    .with('category')
    .with('schedules');

  protected model: Type<ActivityModel> = ActivityModel;

  protected path: string = 'activities';

  protected size: number = 9;

  private connection: MapsConnection;

  @ViewChildren(ActivityCardComponent)
  private cards: QueryList<ActivityCardComponent>;

  @ViewChild(MatChipList, { static: true })
  private chipList: MatChipList;

  @ViewChild('frame', { read: ElementRef, static: true })
  private frame: ElementRef<HTMLIFrameElement>;

  public get categories(): SuburbModel[] {
    return this.route.snapshot.data.categories || [];
  }

  public get suburbs(): SuburbModel[] {
    return this.route.snapshot.data.suburbs || [];
  }

  public get targetGroups(): TargetGroupModel[] {
    return this.route.snapshot.data.targetGroups || [];
  }

  public get values(): { suburbs: string, targetGroups: string } {
    return {
      suburbs: (this.suburbCtrl.value || [])
        .map((id) => this.suburbs.find((item) => item.id === id))
        .map((i) => i.name).join(', '),
      targetGroups: (this.targetGroupCtrl.value || [])
        .map((id) => this.targetGroups.find((item) => item.id === id))
        .map((item) => item.name).join(', ')
    };
  }

  protected get routing(): Route {
    return {
      path: this.path,
      resolve: {
        categories: CrudResolver,
        suburbs: CrudResolver,
        targetGroups: CrudResolver
      },
      data: {
        resolve: {
          categories: CrudJoiner.of(CategoryModel),
          suburbs: CrudJoiner.of(SuburbModel),
          targetGroups: CrudJoiner.of(TargetGroupModel)
        }
      }
    };
  }

  public ngAfterViewInit(): void {
    if (this.platformProvider.type === 'Online') {
      this.chipList.chipSelectionChanges.subscribe(() => this.categoryCtrl
        .setValue(Arr(this.chipList.selected).map((chip) => chip.value)));

      this.route.queryParams.pipe(map((p) => this.params(p).categories || []))
        .subscribe((categories) => this.chipList.chips.forEach((chip) =>
          chip.selected = categories.includes(chip.value)));

      if (this.platformProvider.name === 'Web') {
        const source = this.document.defaultView;
        const target = this.frame.nativeElement.contentWindow;

        this.connection = new MapsConnection(source, target);
        this.connection.focus.subscribe((focus) => this.focusing(focus));
        this.connection.route.subscribe((r) => this.router.navigateByUrl(r));
        this.connection.ready.pipe(filter(Boolean), take(1)).subscribe(() =>
          this.items.subscribe((items) => this.connection.nextItems(items)));

        this.connection.nextReady(true);
      }
    }

    this.route.queryParams.pipe(
      map((params) => this.params(params))
    ).subscribe((params) => {
      const { categories, suburbs, targetgroups } = params;
      this.categoryCtrl.setValue(categories || [], { emitEvent: false });
      this.suburbCtrl.setValue(suburbs || [], { emitEvent: false });
      this.targetGroupCtrl.setValue(targetgroups || [], { emitEvent: false });
    });

    merge(
      this.categoryCtrl.valueChanges.pipe(map((value) => ({
        categories: Arr(value)
      }))),
      this.suburbCtrl.valueChanges.pipe(map((value) => ({
        suburbs: Arr(value)
      }))),
      this.targetGroupCtrl.valueChanges.pipe(map((value) => ({
        targetgroups: Arr(value)
      })))
    ).subscribe((params) => this.navigate(params));
  }

  public color(color: string): string {
    const rgb = ColorConvert.keyword.rgb(color) || ColorConvert.hex.rgb(color);
    return rgb[0] + rgb[1] + rgb[2] > 382 ? '#000' : '#FFF';
  }

  public focus(item: ActivityModel, event: Event): void {
    switch (event.type) {
      case 'mouseenter': return this.connection.nextFocus(this.focusing(item));
      case 'mouseleave': return this.connection.nextFocus(this.focusing(null));
    }
  }

  public has(id: string): boolean {
    const ids = this.categoryCtrl.value || [];
    return ids.includes(id);
  }

  public toggle(id: string): void {
    const ids = this.categoryCtrl.value || [];
    this.categoryCtrl.setValue(
      ids.includes(id)
        ? ids.filter((i) => i !== id)
        : ids.concat(id)
    );
  }

  protected params(params: Params): ReadParams {
    return Object.assign(super.params(params), {
      categories: params.categories ? Arr(params.categories) : null,
      suburbs: params.suburbs ? Arr(params.suburbs) : null,
      targetgroups: params.targetgroups ? Arr(params.targetgroups) : null
    });
  }

  private focusing(input: ActivityModel | ActivityModel[]): ActivityModel[] {
    this.cards.forEach((card) => card.ripple.fadeOutAll());

    if (input) {
      Arr(input).map((i) => this.cards.find((c) => c.item.id === i.id).ripple)
        .forEach((ripple) => ripple.launch({ persistent: true }));
    }

    return input ? Arr(input) : [];
  }

}
