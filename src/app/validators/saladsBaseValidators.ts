import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkSaladsBase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const checkBox = control.value.map(
      value => value.saladsBaseQuantity
      ).filter(
        newValue => newValue === true
        );

    if (checkBox.length === 0 || checkBox.length > 2) {
        return { tooMuchBase: 'Merci de sélectionner au minimum une base. Deux bases maximum sont possibles.' };
    } else {
        return null;
    }
  };
}
