import { NgModule, Type } from '@angular/core';
import { LabelComponent } from './label.component';

const components: Type<any>[] = [
  LabelComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})

export class LabelModule { }
