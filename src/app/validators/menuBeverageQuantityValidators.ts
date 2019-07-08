import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function quantityMenuBeverageControl(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (control.pristine) {
        return { lessBeverage: 'Merci de sélectionner une boisson' };
    } else {
        return null;
    }
  };
}
