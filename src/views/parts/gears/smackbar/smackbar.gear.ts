import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PushedModel, PushedProvider } from '../../../../core';

@Component({
  selector: 'smackbar-gear',
  styleUrls: ['smackbar.gear.sass'],
  templateUrl: 'smackbar.gear.html'
})

export class SmackbarGearComponent
  implements OnInit {

  public notification: Observable<PushedModel['notifications'][number]>;

  public constructor(
    private pushedProvider: PushedProvider
  ) { }

  public ngOnInit(): void {
    this.notification = this.pushedProvider.value.pipe(map((item) => {
      const notification = item.notifications[0];

      if (notification && !notification.read) {
        return notification;
      }

      return null;
    }));
  }

  public read(item: PushedModel['notifications'][number]): void {
    this.pushedProvider.setRead(item);
  }

}
