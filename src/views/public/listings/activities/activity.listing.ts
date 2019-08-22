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

  public ellipsis: boolean = true;

  public suburbCtrl: FormControl = new FormControl();

  public targetGroupCtrl: FormControl = new FormControl();

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel)
    .with('address').yield('suburb')
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

  @ViewChild('map', { read: ElementRef, static: true })
  private map: ElementRef<HTMLElement>;

  @ViewChild('nav', { read: ElementRef, static: true })
  private nav: ElementRef<HTMLElement>;

  public get categories(): SuburbModel[] {
    return this.route.snapshot.data.categories || [];
  }

  public get suburbs(): SuburbModel[] {
    return this.route.snapshot.data.suburbs || [];
  }

  public get targetGroups(): TargetGroupModel[] {
    return this.route.snapshot.data.targetGroups || [];
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
      this.route.queryParams.pipe(
        map((params) => this.params(params))
      ).subscribe((params) => {
        const { categories, suburbs, targetgroups } = params;
        this.suburbCtrl.setValue(suburbs || [], { emitEvent: false });
        this.targetGroupCtrl.setValue(targetgroups || [], { emitEvent: false });
        this.chipList.chips.forEach((chip) =>
          chip.selected = (categories || []).includes(chip.value));
      });

      merge(
        this.chipList.chipSelectionChanges.pipe(map(() => ({
          categories: Arr(this.chipList.selected).map((chip) => chip.value)
        }))),
        this.suburbCtrl.valueChanges.pipe(map((value) => ({
          suburbs: Arr(value)
        }))),
        this.targetGroupCtrl.valueChanges.pipe(map((value) => ({
          targetgroups: Arr(value)
        })))
      ).subscribe((params) => this.navigate(params));

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
