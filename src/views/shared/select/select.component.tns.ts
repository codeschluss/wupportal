import { Component, HostBinding, Input, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrudModel } from '@wooportal/core';
import { ModalDialogParams, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { SelectComponent as Compat } from './select.component.i';

@Component({
  styleUrls: ['select.component.scss'],
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
        <icon-component icon="check-circle"></icon-component>
      </StackLayout>
    </AbsoluteLayout>
  `
})

export class SelectPopupComponent {

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
  entryComponents: [SelectPopupComponent],
  selector: 'select-component',
  template: `
    <GridLayout (tap)="open()">
      <ng-content></ng-content>
    </GridLayout>
  `
})

export class SelectComponent implements Compat {

  @HostBinding('attr.component')
  public readonly component: string = 'select';

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
    this.dialog.showModal(SelectPopupComponent, {
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
