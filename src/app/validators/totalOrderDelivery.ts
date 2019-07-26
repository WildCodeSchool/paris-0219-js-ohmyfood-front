import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function totalOrderDelivery(orderStatus: string, totalOrder: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const statusOrder = control.get(orderStatus).value;

    const orderTotal = control.get(totalOrder).value;

    if (statusOrder === 'en livraison' && orderTotal < 15) {

      return { notEnough: `En livraison, le montant minimum de la commande est de 15€` };

    } else {
        return null;
    }
  };
}
