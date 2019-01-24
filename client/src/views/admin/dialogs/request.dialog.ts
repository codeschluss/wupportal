import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatInput, MatSelectionListChange } from '@angular/material';
import { TokenProvider } from '@portal/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, startWith, switchMap, take } from 'rxjs/operators';
import { OrganisationModel } from '../../../realm/organisation/organisation.model';
import { OrganisationProvider } from '../../../realm/organisation/organisation.provider';
import { UserProvider } from '../../../realm/user/user.provider';

@Component({
  styles: [`
    :host { display: block; width: 480px; }
    mat-form-field { width: 100%; }
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
      <mat-selection-list (selectionChange)="select($event)">
        <ng-container *ngFor="let item of items">
          <mat-list-option [value]="item.id">
            {{ item.name }}
          </mat-list-option>
        </ng-container>
      </mat-selection-list>
    </section>
    <section mat-dialog-actions>
      <button mat-raised-button mat-dialog-close tabindex="-1">
        <i18n i18n="@@close">close</i18n>
      </button>
      <button mat-raised-button color="primary" [disabled]="!ids.length"
        (click)="request()">
        <i18n i18n="@@joinOrganisations">joinOrganisations</i18n>
      </button>
    </section>
  `
})

export class RequestDialogComponent implements OnInit {

  @ViewChild(MatInput)
  public filter: MatInput;

  public ids: string[] = [];

  public items: OrganisationModel[];

  public constructor(
    private dialog: MatDialogRef<RequestDialogComponent>,
    private organisationProvider: OrganisationProvider,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider
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

  public request(): void {
    this.tokenProvider.value.pipe(take(1)).pipe(switchMap((tokens) =>
      this.userProvider.linkOrganisations(tokens.access.id, this.ids))
    ).subscribe(() => this.dialog.close(true));
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
        !tokens.access.adminOrgas.includes(item.id) &&
        !tokens.access.approvedOrgas.includes(item.id)
      )),
      catchError(() => of([]))
    );
  }

}
