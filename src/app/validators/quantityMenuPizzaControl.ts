import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function quantityMenuPizzaControl(pizza: string, beverage: string, dessert: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    // get pizzas, beverages and desserts values
    const pizz = control.get(pizza);
    const bev = control.get(beverage);
    const dess = control.get(dessert);

    if (pizz.pristine || bev.pristine || dess.pristine ) {
      return { lessPizzAndBevAndDess: 'Merci de sélectionner au moins une pizza, une boisson et un dessert' };
    } else {
        return null;
    }
  };
}
