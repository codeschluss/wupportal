import { FormControl } from '@angular/forms';
import { CrudModel } from '@wooportal/core';

export interface SelectComponent {

  readonly component: string;

  formControl: FormControl;

  items: CrudModel[];

  key: string;

  multiple: boolean;

}
