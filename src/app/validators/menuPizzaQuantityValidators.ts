import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function quantityMenuPizzaControl(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (control.pristine) {
        return { lessPizza: 'Merci de sélectionner une pizzas' };
    } else {
        return null;
    }
  };
}
