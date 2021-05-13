import { EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivityModel } from '../../core';

export class MapsConnection {

  public route: EventEmitter<string>;

  public focus: EventEmitter<ActivityModel[]>;

  public items: EventEmitter<ActivityModel[]>;

  public ready: BehaviorSubject<boolean>;

  public constructor(
    private source: Window,
    private target: Window
  ) {
    this.route = new EventEmitter<string>();
    this.focus = new EventEmitter<ActivityModel[]>();
    this.items = new EventEmitter<ActivityModel[]>();
    this.ready = new BehaviorSubject<boolean>(false);

    this.source.onmessage = this.incoming.bind(this);
  }

  public nextFocus(focus: ActivityModel[]): void {
    this.outgoing({ focus });
  }

  public nextItems(items: ActivityModel[]): void {
    this.outgoing({ items });
  }

  public nextReady(ready: boolean): void {
    this.outgoing({ ready });
  }

  public nextRoute(route: string): void {
    this.outgoing({ route });
  }

  private incoming(event: MessageEvent): void {
    Object.keys(event.data).forEach((key) => {
      switch (key) {
        case 'focus': return this.focus.emit(event.data[key]);
        case 'items': return this.items.emit(event.data[key]);
        case 'ready': return this.ready.next(event.data[key]);
        case 'route': return this.route.emit(event.data[key]);
      }
    });
  }

  private outgoing(message: any): void {
    const data = JSON.parse(JSON.stringify(message, (key, value) =>
      key.startsWith('_') || value instanceof Observable ? undefined : value));

    try {
      this.target.postMessage(data, this.target.origin || '*');
    } catch (exception) {
      this.ready.next(false);
    }
  }

}
