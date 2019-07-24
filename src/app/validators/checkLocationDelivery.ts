import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkLocationDelivery(orderStatus: string, locationZipCode: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    // Get zipCode
    let zipCode = control.get(locationZipCode).value;

    // Get status Order
    const statusOrder = control.get(orderStatus).value;

    // Avoid space between number to avoid error in condition
    zipCode = Number.parseInt(zipCode.toString().split(' ').join(''), 10);

    if (statusOrder === 'en livraison' && zipCode !== 94150 && zipCode !== 91320 && zipCode !== 94260) {
      return { tooFar: `Nous livrons uniquement les villes suivantes : Rungis 94150, Wissous 91320 et Fresnes 94260` };
    } else {
        return null;
    }
  };
}
