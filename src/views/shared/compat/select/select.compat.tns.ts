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
            <StackLayout ripple (tap)="toggle(item.id)">
              <Switch
                isUserInteractionEnabled="false"
                [checked]="selection.includes(item.id)">
              </Switch>
              <Label [text]="item.name"></Label>
            </StackLayout>
          </ng-container>
        </StackLayout>
      </ScrollView>
      <StackLayout ripple
        rippleColor="#fff"
        (tap)="data.closeCallback(selection)">
        <icon-compat icon="check-circle"></icon-compat>
      </StackLayout>
    </AbsoluteLayout>
  `
})

export class SelectCompatDialogComponent {

  public selection: string[] = this.data.context.selection;

  public constructor(
    public data: ModalDialogParams
  ) { }

  public toggle(id: string): void {
    if (this.data.context.multiple) {
      this.selection.includes(id)
        ? this.selection.splice(this.selection.indexOf(id), 1)
        : this.selection.push(id);
    } else {
      this.selection = [id];
    }
  }

}

@Component({
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
  public multiple: boolean;

  public constructor(
    private container: ViewContainerRef,
    private dialog: ModalDialogService
  ) { }

  public open(): void {
    this.dialog.showModal(SelectCompatDialogComponent, {
      context: {
        items: this.items,
        multiple: this.multiple,
        selection: (this.formControl.value || []).slice()
      },
      viewContainerRef: this.container
    }).then((ids) => setTimeout(() => this.formControl.setValue(ids)));
  }

}
