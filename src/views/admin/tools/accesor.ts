import { Directive, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[type=file]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileValueAccessorDirective,
      multi: true
    }
  ]
})

export class FileValueAccessorDirective
  implements ControlValueAccessor {

  @HostListener('change', ['$event.target.files'])
  public onChange(_: any): void { }

  @HostListener('blur')
  public onTouched(): void { }

  public registerOnChange(fn: (_: any) => { }): void { this.onChange = fn; }

  public registerOnTouched(fn: () => { }): void { this.onTouched = fn; }

  public writeValue(_: any): void { }

}
