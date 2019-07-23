import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Arr, CrudJoiner, CrudResolver, PlatformProvider, ReadParams } from '@wooportal/core';
import * as colorConvert from 'color-convert';
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
  styleUrls: ['activity.listing.scss'],
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

  protected size: number = 12;

  private connection: MapsConnection;

  @ViewChildren(ActivityCardComponent)
  private cards: QueryList<ActivityCardComponent>;

  @ViewChild(MatChipList, { static: true })
  private chips: MatChipList;

  @ViewChild('maps', { read: ElementRef, static: true })
  private maps: ElementRef<HTMLIFrameElement>;

  public get categories(): SuburbModel[] {
    return this.ellipsis
      ? (this.route.snapshot.data.categories || []).slice(0, 5)
      : this.route.snapshot.data.categories || [];
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

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private platformProvider: PlatformProvider,
    crudResolver: CrudResolver,
    route: ActivatedRoute,
    router: Router
  ) {
    super(route, router, crudResolver);
  }

  public ngAfterViewInit(): void {
    if (this.platformProvider.type === 'Online') {
      const params = this.mapParams(this.route.snapshot.queryParams);
      this.suburbCtrl.setValue(params.suburbs, { emitEvent: false });
      this.targetGroupCtrl.setValue(params.targetgroups, { emitEvent: false });
      this.chips._setSelectionByValue(params.categories, false);

      merge(
        this.chips.chipSelectionChanges.pipe(map(() => ({
          categories: Arr(this.chips.selected).map((chip) => chip.value)
        }))),
        this.suburbCtrl.valueChanges.pipe(map((value) => ({
          suburbs: Arr(value)
        }))),
        this.targetGroupCtrl.valueChanges.pipe(map((value) => ({
          targetgroups: Arr(value)
        })))
      ).pipe(map((p) => Object.assign(p, { page: 0 }))).subscribe((p) =>
        this.fetch(p).subscribe((items) => this.items.next(items)));

      if (this.platformProvider.name === 'Web') {
        const source = this.document.defaultView;
        const target = this.maps.nativeElement.contentWindow;

        this.connection = new MapsConnection(source, target);
        this.connection.focus.subscribe((focus) => this.focusing(focus));
        this.connection.nextReady(true);

        this.connection.ready.pipe(filter(Boolean), take(1)).subscribe(() =>
          this.items.subscribe((items) => this.connection.nextItems(items)));
      }
    }
  }

  public handleColor(color: string): string {
    const rgb = colorConvert.keyword.rgb(color) || colorConvert.hex.rgb(color);
    return rgb[0] + rgb[1] + rgb[2] > 382 ? '#000' : '#FFF';
  }

  public handleFocus(item: ActivityModel, event: Event): void {
    switch (event.type) {
      case 'mouseenter': return this.connection.nextFocus(this.focusing(item));
      case 'mouseleave': return this.connection.nextFocus(this.focusing(null));
    }
  }

  protected mapParams(params: ReadParams): ReadParams {
    const mapper = (p) => Arr(p).length ? Arr(p) : null;

    return Object.assign(super.mapParams(params), {
      categories: mapper(params.categories),
      suburbs: mapper(params.suburbs),
      targetgroups: mapper(params.targetgroups)
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
