import { COMMA, ENTER, SEMICOLON, SPACE } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { CrudModel } from '@portal/core';
import { map } from 'rxjs/operators';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: BaseFieldComponent.template(`
    <mat-chip-list #chips>
      <ng-container *ngFor="let item of value" ngProjectAs="mat-chip">
        <mat-chip [selectable]="false" (removed)="delete(item)">
          {{ toLabel(item) }}<span matChipRemove>&#x274c;</span>
        </mat-chip>
      </ng-container>
      <input #input
        [formControl]="search"
        [id]="field.name"
        [matAutocomplete]="auto"
        [matChipInputFor]="chips"
        [matChipInputSeparatorKeyCodes]="keys"
        (matChipInputTokenEnd)="create($event)">
    </mat-chip-list>
    <mat-autocomplete #auto="matAutocomplete" (optionSelected)="add($event)">
      <ng-container *ngFor="let item of options">
        <mat-option [value]="item.id">{{ toLabel(item) }}</mat-option>
      </ng-container>
    </mat-autocomplete>
  `)
})

export class ChipListFieldComponent extends BaseFieldComponent {

  @ViewChild('auto')
  public auto: MatAutocomplete;

  @ViewChild('input')
  public input: ElementRef<HTMLInputElement>;

  public keys: number[] = [COMMA, ENTER, SEMICOLON, SPACE];

  public search: FormControl = new FormControl();

  public options: CrudModel[];

  public add(event: MatAutocompleteSelectedEvent): void {
    if (!this.value.some((item) => item.id === event.option.value)) {
      this.value = this.value.concat(this.toModel(event.option.value));
    }
  }

  public create(event: MatChipInputEvent): void {
    const label = this.sanitize(event.value);
    if (label && !this.find(label)) {
      this.value = this.value.concat(this.find(label, this.field.options) ||
        Object.assign(new this.field.model(), { [this.field.label]: label }));
    }
  }

  public delete(item: CrudModel): void {
    this.value = this.value.filter((value) => value !== item);
  }

  protected ngPostInit(): void {
    if (!this.value) { this.value = []; }
    this.group.get(this.field.name).valueChanges.subscribe(() => this.clear());
    this.input.nativeElement.onblur = () => this.auto.isOpen || this.clear();
    this.search.valueChanges.pipe(map((label) => this.optionalize(label)))
      .subscribe((items) =>  this.options = items);
  }

  private clear(): void {
    this.input.nativeElement.value = '';
    this.search.setValue('');
  }

  private find(label: string = '', items = this.value): CrudModel {
    return label && items.find((item) => this.toLabel(item)
      .localeCompare(label, undefined, { sensitivity: 'accent' }) === 0);
  }

  private matches(label: string = '', items = this.value): CrudModel[] {
    const regex = new RegExp(label, 'i');
    return items.filter((item) => this.toLabel(item).search(regex) >= 0);
  }

  private optionalize(label: string = '', items = this.value): CrudModel[] {
    return !label ? [] : this.matches(label, this.field.options
      .filter((item) => !this.find(this.toLabel(item), items)));
  }

  private sanitize(label: string = ''): string {
    // TODO: sanetize
    return label = label.trim().length < 3 ? '' :
      label[0].toUpperCase() + label.substr(1).toLowerCase();
  }

}
