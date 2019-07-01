import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkSaladsToppings(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const quantity = control.value.map(
      toppings => toppings.saladsToppingsQuantity
      ).filter(
        result => result > 0
        );

    if (quantity.length === 0) {
        return { isRequired: 'Merci de sélectionner au moins un topping' };
    } else {
        return null;
    }
  };
}
