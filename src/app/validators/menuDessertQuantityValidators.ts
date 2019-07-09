import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function quantityMenuDessertControl(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (control.pristine) {
        return { lessDessert: 'Merci de sélectionner un dessert' };
    } else {
        return null;
    }
  };
}
