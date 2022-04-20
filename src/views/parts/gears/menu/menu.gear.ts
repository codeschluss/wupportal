import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { LabelResolver } from '../../../../core';

@Component({
  selector: 'menu-gear',
  styleUrls: ['menu.gear.sass'],
  templateUrl: 'menu.gear.html'
})

export class MenuGearComponent {

  public items: {
    label: string;
    href: string;
    icon: IconName;
  }[] = [
    {
      label: 'homepage',
      href: '/',
      icon: 'home'
    },
    {
      label: 'activities',
      href: '/events',
      icon: 'calendar-day'
    },
    {
      label: 'mapview',
      href: '/mapview',
      icon: 'location-dot'
    },
    {
      label: 'blogposts',
      href: '/community',
      icon: 'comments'
    },
    {
      label: 'favorites',
      href: '/favorites',
      icon: 'heart'
    },
    {
      label: 'sitemap',
      href: '/sitemap',
      icon: 'bars'
    }
  ];

  public constructor(
    private labelResolver: LabelResolver,
    private router: Router
  ) { }

  public active(item: this['items'][number]): boolean {
    return item.href.endsWith('/')
      ? this.router.url === item.href
      : this.router.url.startsWith(item.href);
  }

  public i18n(item: this['items'][number]): string {
    return this.labelResolver.lookup(item.label);
  }

}
