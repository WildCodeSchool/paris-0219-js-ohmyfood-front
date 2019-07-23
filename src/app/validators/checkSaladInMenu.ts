import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function checkSaladInMenu(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    // Get salad quantity
    const salad = control.value.orderSaladsQuantity;

    if (salad > 0) {
        return null;
    } else {
        return { lessSalad: 'Merci de créer une salade pour valider votre menu' };
    }
  };
}
