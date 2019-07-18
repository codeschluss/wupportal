import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityModel } from '../../realm/models/activity.model';

export class MapsConnection {

  public focus: EventEmitter<ActivityModel[]>;

  public items: EventEmitter<ActivityModel[]>;

  public constructor(
    private source: Window,
    private target: Window
  ) {
    this.focus = new EventEmitter<ActivityModel[]>();
    this.items = new EventEmitter<ActivityModel[]>();
    this.source.onmessage = this.incoming.bind(this);
  }

  public nextFocus(focus: ActivityModel[]): void {
    this.outgoing({ focus: focus });
  }

  public nextItems(items: ActivityModel[]): void {
    this.outgoing({ items: items });
  }

  private incoming(event: MessageEvent): void {
    Object.keys(event.data).forEach((key) => {
      switch (key) {
        case 'focus': return this.focus.emit(event.data[key]);
        case 'items': return this.items.emit(event.data[key]);
      }
    });
  }

  private outgoing(message: any): void {
    const data = JSON.parse(JSON.stringify(message, (key, value) =>
      key.startsWith('_') || value instanceof Observable ? undefined : value));

    this.target.postMessage(data, this.target.origin);
  }

}
