import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkBevAndDess(beverage: string, dessert: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    // get beverages and desserts value
    const bev = control.get(beverage);
    const dess = control.get(dessert);

    if (bev.pristine && dess.pristine ) {
      return { lessBevOrDess: 'Merci de sélectionner au moins une boisson ou un dessert' };
    } else {
        return null;
    }
  };
}
