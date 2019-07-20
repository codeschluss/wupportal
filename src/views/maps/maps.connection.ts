import { EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivityModel } from '../../realm/models/activity.model';

export class MapsConnection {

  public focus: EventEmitter<ActivityModel[]>;

  public items: EventEmitter<ActivityModel[]>;

  public ready: BehaviorSubject<boolean>;

  public constructor(
    private source: Window,
    private target: Window
  ) {
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

  private incoming(event: MessageEvent): void {
    Object.keys(event.data).forEach((key) => {
      switch (key) {
        case 'focus': return this.focus.emit(event.data[key]);
        case 'items': return this.items.emit(event.data[key]);
        case 'ready': return this.ready.next(event.data[key]);
      }
    });
  }

  private outgoing(message: any): void {
    const data = JSON.parse(JSON.stringify(message, (key, value) =>
      key.startsWith('_') || value instanceof Observable ? undefined : value));

    this.target.postMessage(data, this.target.origin || '*');
  }

}
