import { AbstractControl, ValidatorFn } from '@angular/forms';

export class BaseTests {

  public static neither(...fields: string[]): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.parent) {
        const controls = fields
          .map((field) => control.parent.get(field))
          .filter((field) => field !== control);

        if (control.value || controls.some((ctrl) => ctrl.value)) {
          controls.filter((ctrl) => ctrl.hasError('neither'))
            .forEach((ctrl) => ctrl.setErrors(null));

          return null;
        } else {
          controls.filter((ctrl) => !ctrl.hasError('neither'))
            .forEach((ctrl) => ctrl.setErrors({ neither: true }));

          return { neither: true };
        }
      }
    };
  }

}
