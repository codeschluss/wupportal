import { Component, HostBinding, Input, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrudModel } from '@wooportal/core';
import { ModalDialogParams, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { SelectCompat } from './select.compat.i';

@Component({
  styleUrls: ['select.compat.scss'],
  template: `
    <AbsoluteLayout>
      <ScrollView>
        <StackLayout>
          <ng-container *ngFor="let item of data.context.items">
            <StackLayout ripple (tap)="toggle(item[data.context.key])">
              <Switch
                isUserInteractionEnabled="false"
                [checked]="active(item[data.context.key])">
              </Switch>
              <Label [text]="item.name"></Label>
            </StackLayout>
          </ng-container>
          <GridLayout></GridLayout>
        </StackLayout>
      </ScrollView>
      <StackLayout ripple
        rippleColor="#fff"
        (tap)="data.closeCallback(data.context.selected)">
        <icon-compat icon="check-circle"></icon-compat>
      </StackLayout>
    </AbsoluteLayout>
  `
})

export class SelectCompatDialogComponent {

  public constructor(
    public data: ModalDialogParams
  ) { }

  public active(value: string): boolean {
    const context = this.data.context;

    return context.multiple
      ? context.selected.includes(value)
      : context.selected === value;
  }

  public toggle(value: string): void {
    const context = this.data.context;

    if (!context.multiple) {
      context.selected = value;
    } else {
      context.selected.includes(value)
        ? context.selected.splice(context.selected.indexOf(value), 1)
        : context.selected.push(value);
    }
  }

}

@Component({
  entryComponents: [SelectCompatDialogComponent],
  selector: 'select-compat',
  template: `
    <GridLayout (tap)="open()">
      <ng-content></ng-content>
    </GridLayout>
  `
})

export class SelectCompatComponent implements SelectCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'select';

  @Input()
  public formControl: FormControl;

  @Input()
  public items: CrudModel[];

  @Input()
  public key: string;

  @Input()
  public multiple: boolean;

  public constructor(
    private container: ViewContainerRef,
    private dialog: ModalDialogService
  ) { }

  public open(): void {
    this.dialog.showModal(SelectCompatDialogComponent, {
      context: {
        items: this.items,
        key: this.key || 'id',
        multiple: this.multiple,
        selected: this.multiple
          ? (this.formControl.value || []).slice()
          : this.formControl.value
      },
      viewContainerRef: this.container
    }).then((selection) => {
      if (selection && selection !== this.formControl.value) {
        setTimeout(() => this.formControl.setValue(selection));
      }
    });
  }

}
