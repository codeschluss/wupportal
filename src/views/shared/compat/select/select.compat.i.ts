import { FormControl } from '@angular/forms';
import { CrudModel } from '@wooportal/core';

export interface SelectCompat {

  readonly compat: string;

  formControl: FormControl;

  items: CrudModel[];

  multiple: boolean;

}
