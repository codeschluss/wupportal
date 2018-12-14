import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';

@Component({
  template: `
    <mat-tab-group>
      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@configuration">configuration</i18n>
        </ng-template>
        <ng-container *ngIf="configuration">
          <configuration-form #form [item]="configuration"></configuration-form>
          <button mat-button [disabled]="!form.isValid" (click)="form.save()">
            <i18n i18n="@@save">save</i18n>
        </button>
        </ng-container>
      </mat-tab>

      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@users">users</i18n>
        </ng-template>
        <ng-template matTabContent>
          <user-table></user-table>
        </ng-template>
      </mat-tab>

      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@languages">languages</i18n>
        </ng-template>
        <ng-template matTabContent>
          <language-table></language-table>
        </ng-template>
      </mat-tab>

      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@categories">categories</i18n>
        </ng-template>
        <ng-template matTabContent>
          <category-table></category-table>
        </ng-template>
      </mat-tab>

      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@targetGroups">targetGroups</i18n>
        </ng-template>
        <ng-template matTabContent>
          <target-group-table></target-group-table>
        </ng-template>
      </mat-tab>

      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@tags">tags</i18n>
        </ng-template>
        <ng-template matTabContent>
          <tag-table></tag-table>
        </ng-template>
      </mat-tab>

      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@suburbs">suburbs</i18n>
        </ng-template>
        <ng-template matTabContent>
          <suburb-table></suburb-table>
        </ng-template>
      </mat-tab>

      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@addresses">addresses</i18n>
        </ng-template>
        <ng-template matTabContent>
          <address-table></address-table>
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `
})

export class ApplicationPanelComponent implements OnInit {

  // public static get route(): Route {
  //   return {
  //     path: 'application',
  //     component: ApplicationPanelComponent,
  //     resolve: {
  //       configuration: CrudResolver
  //     },
  //     data: {
  //       configuration: CrudJoiner.of(ConfigurationModel)
  //     }
  //   };
  // }

  public configuration: ConfigurationModel[];

  public constructor(
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.configuration = this.route.snapshot.data.configuration.reduce(
      (obj, conf) => Object.assign(obj, { [conf.item]: conf.value }), { });
  }

}
