import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlatformProvider } from '../../../../core';

@Component({
  styleUrls: ['notification.popup.sass'],
  templateUrl: 'notification.popup.html'
})

export class NotificationPopupComponent {

  public get content(): string {
    switch (this.platformProvider.name) {
      case 'android': return this.data.gcm.body;
      case 'ios': return this.data.aps.alert.body;
    }
  }

  public get route(): string {
    switch (this.platformProvider.name) {
      case 'android': return this.data.route;
      case 'ios': return this.data.aps.route;
    }
  }

  public get title(): string {
    switch (this.platformProvider.name) {
      case 'android': return this.data.gcm.title;
      case 'ios': return this.data.aps.alert.title;
    }
  }

  public constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private platformProvider: PlatformProvider
  ) { }

}
