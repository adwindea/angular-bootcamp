import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** A hero's name can't match the given regular expression */
export function NumberOnlyValidator(nameRe: RegExp = /^[0-9]+$/): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null: {forbiddenName: {value: control.value}};
  };
}
