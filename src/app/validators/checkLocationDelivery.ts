import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkLocationDelivery(orderStatus: string, locationZipCode: string, totalOrder: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    // Get zipCode
    let zipCode = control.get(locationZipCode).value;

    // Get status Order
    const statusOrder = control.get(orderStatus).value;

    // Get total price of order
    const orderTotal = Number.parseFloat(control.get(totalOrder).value);

    // Avoid space between number to avoid error in condition
    zipCode = Number.parseInt(zipCode.toString().split(' ').join(''), 10);

    if (statusOrder === 'en livraison' && zipCode !== 94150 && zipCode !== 91320 && zipCode !== 94260 && orderTotal < 15) {
      return { tooFar: `Nous livrons uniquement les villes suivantes : Rungis 94150, Wissous 91320 et Fresnes 94260`,
              notEnough: `Le montant de la commande en livraison doit être de 15€ minimum` };

    } else if (orderTotal <= 0) {
        return { emptyOrder: `Votre commande est vide` };

    } else {
        return null;
    }
  };
}
