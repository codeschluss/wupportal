import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, Observable, shareReplay } from 'rxjs';
import { PushedGuarding, PushedModel, PushedProvider, SessionProvider, SubscriptionProvider, SubscriptionTypeModel, SubscriptionTypeProvider } from '../../../../core';

@Component({
  selector: 'notification-gear',
  styleUrls: ['notification.gear.sass'],
  templateUrl: 'notification.gear.html'
})

export class NotificationGearComponent
  implements OnInit {

  public active: Observable<boolean>;

  public disabled: Observable<boolean>;

  public matBadge: Observable<number | null>;

  public notifications: Observable<PushedModel['notifications']>;

  public subscribedTypes: Observable<string[]>;

  public subscriptionId: Observable<string>;

  public subscriptionTypes: Observable<SubscriptionTypeModel[]>;

  public constructor(
    private pushedGuarding: PushedGuarding,
    private pushedProvider: PushedProvider,
    private router: Router,
    private sessionProvider: SessionProvider,
    private subscriptionProvider: SubscriptionProvider,
    private subscriptionTypeProvider: SubscriptionTypeProvider
  ) { }

  public ngOnInit(): void {
    this.notifications = this.pushedProvider.value.pipe(
      map((item) => item.notifications)
    );

    this.matBadge = this.notifications.pipe(
      map((items) => items.filter((i) => !i.read).length || null)
    );

    this.subscriptionId = this.sessionProvider.value.pipe(
      map((item) => item.subscriptionId)
    );

    this.subscribedTypes = this.subscriptionId.pipe(
      mergeMap((id) => this.subscriptionProvider.readOne(id)),
      mergeMap((item) => item.types as Observable<SubscriptionTypeModel[]>),
      map((items) => items.map((item) => item.id)),
      shareReplay(1)
    );

    this.subscriptionTypes = this.subscriptionTypeProvider.readAll().pipe(
      shareReplay(1)
    );
  }

  public read(item: PushedModel['notifications'][number]): void {
    this.pushedProvider.setRead(item);

    if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }

  public styles(element: HTMLElement): Partial<CSSStyleDeclaration> {
    if (element.scrollWidth > element.clientWidth) {
      const animation = (element.scrollWidth + element.clientWidth) * 15 + 'ms';
      const transition = element.scrollWidth * 15 + 'ms';

      return {
        animationDelay: transition,
        animationDuration: animation,
        transitionDuration: transition
      };
    }

    return null;
  }

  public subscribe(): void {
    this.pushedGuarding.requestActivation().pipe(
      catchError(() => this.router.navigate(['/', 'error', 451]))
    ).subscribe();
  }

  public toggle(event: boolean, id: string): void {
    const method = event
      ? this.subscriptionProvider.linkTypes
      : this.subscriptionProvider.unlinkTypes;

    this.subscriptionId.pipe(
      mergeMap((subscriptionId) => method(subscriptionId, [id]))
    ).subscribe();
  }

}
