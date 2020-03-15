import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatSelectionListChange } from '@angular/material/list';
import { TokenProvider } from '@wooportal/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, startWith, take } from 'rxjs/operators';
import { OrganisationModel } from '../../../base/models/organisation.model';
import { OrganisationProvider } from '../../../base/providers/organisation.provider';
import { UserProvider } from '../../../base/providers/user.provider';

@Component({
  styles: [`
    :host { display: block; max-width: 100%; width: 30rem; }
    mat-form-field { width: 100%; }
  `],
  template: `
    <h2 mat-dialog-title>
      <i18n i18n="@@selectOrganisations">selectOrganisations</i18n>
    </h2>
    <section mat-dialog-content>
      <mat-form-field>
        <mat-label><i18n i18n="@@search">search</i18n></mat-label>
        <input matInput type="search">
      </mat-form-field>
      <mat-selection-list (selectionChange)="select($event)">
        <ng-container *ngFor="let item of items">
          <mat-list-option [value]="item.id">
            {{ item.name }}
          </mat-list-option>
        </ng-container>
      </mat-selection-list>
    </section>
    <section mat-dialog-actions>
      <button mat-button mat-dialog-close>
        <i18n i18n="@@close">close</i18n>
      </button>
      <button mat-button
        color="primary"
        [disabled]="!ids.length"
        (click)="request()">
        <i18n i18n="@@joinOrganisations">joinOrganisations</i18n>
      </button>
    </section>
  `
})

export class RequestPopupComponent implements OnInit {

  public ids: string[] = [];

  public items: OrganisationModel[];

  @ViewChild(MatInput, { static: true })
  private search: MatInput;

  public constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialogRef<RequestPopupComponent>,
    private organisationProvider: OrganisationProvider,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider
  ) { }

  public ngOnInit(): void {
    this.search.stateChanges.pipe(
      map(() => this.search.value || null),
      debounceTime(1000),
      startWith(null as string),
      distinctUntilChanged(),
      mergeMap((filter) => this.suggest(filter)),
    ).subscribe((items) => this.items = items);
  }

  public request(): void {
    this.tokenProvider.value.pipe(take(1)).pipe(mergeMap((tokens) =>
      this.userProvider.linkOrganisations(tokens.access.id, this.ids))
    ).subscribe(() => this.dialog.close(true));
  }

  public select(event: MatSelectionListChange): void {
    this.ids.includes(event.option.value)
      ? this.ids.splice(this.ids.findIndex((i) => i === event.option.value), 1)
      : this.ids.push(event.option.value);
  }

  private suggest(filter: string = ''): Observable<OrganisationModel[]> {
    return this.organisationProvider.readAll({
      approved: true,
      filter
    }).pipe(map((items) => items.filter((item) => {
      try {
        return !this.data.organisations.find((o) => o.id === item.id);
      } catch { }

      return true;
    })));
  }

}
