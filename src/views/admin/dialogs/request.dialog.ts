import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatSelectionListChange } from '@angular/material';
import { TokenProvider } from '@portal/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, startWith, take } from 'rxjs/operators';
import { OrganisationModel } from '../../../realm/organisation/organisation.model';
import { OrganisationProvider } from '../../../realm/organisation/organisation.provider';

@Component({
  styles: [`
    cdk-virtual-scroll-viewport { height: 50vh; width: 480px; }
    mat-form-field { width: 100%; }
    mat-selection-list { padding-top: 0; }
  `],
  template: `
    <h1 mat-dialog-title>
      <i18n i18n="@@selectOrganisation">selectOrganisation</i18n>
    </h1>
    <section mat-dialog-content>
      <mat-form-field>
        <mat-label><i18n i18n="@@search">search</i18n></mat-label>
        <input matInput type="search">
      </mat-form-field>
      <cdk-virtual-scroll-viewport [itemSize]="height">
        <mat-selection-list (selectionChange)="select($event)">
          <ng-container *cdkVirtualFor="let item of items">
            <mat-list-option [value]="item.id">
              {{ item.name }}
            </mat-list-option>
          </ng-container>
        </mat-selection-list>
      </cdk-virtual-scroll-viewport>
    </section>
    <section mat-dialog-actions>
      <button mat-button mat-dialog-close tabindex="-1">
        <i18n i18n="@@close">close</i18n>
      </button>
      <button mat-button color="primary" [disabled]="!ids.length"
        [mat-dialog-close]="ids">
        <i18n i18n="@@apply">apply</i18n>
      </button>
    </section>
  `
})

export class RequestDialogComponent implements OnInit {

  @ViewChild(MatInput)
  public filter: MatInput;

  public height: number = 48;

  public ids: string[] = [];

  public items: OrganisationModel[];

  public constructor(
    private organisationProvider: OrganisationProvider,
    private tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    this.filter.stateChanges.pipe(
      map(() => this.filter.value || null),
      debounceTime(1000),
      startWith(null),
      distinctUntilChanged(),
      mergeMap((label) => this.suggest(label)),
    ).subscribe((items) => this.items = items);
  }

  public select(event: MatSelectionListChange): void {
    this.ids.includes(event.option.value)
      ? this.ids.splice(this.ids.findIndex((i) => i === event.option.value), 1)
      : this.ids.push(event.option.value);
  }

  private suggest(label: string = ''): Observable<OrganisationModel[]> {
    return forkJoin(
      this.organisationProvider.readAll({ filter: label }),
      this.tokenProvider.value.pipe(take(1))
    ).pipe(
      map(([items, tokens]) => items.filter((item) =>
        !tokens.access.approvedOrgas.includes(item.id))),
      catchError(() => of([]))
    );
  }

}
