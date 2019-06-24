import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkSaladsBase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const checkBox = control.value.map(value => value.saladsBaseQuantity)
      .filter(newValue => newValue === true);

    if (checkBox.length > 2) {
        return { tooMuchBase: 'Merci de ne sélectionner que deux bases maximum' };
    } else {
        return null;
    }
  };
}
