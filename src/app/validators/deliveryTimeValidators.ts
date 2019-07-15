import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function deliveryIntervalTime(orderHour: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const hourMenuMin = 113000;
    const hourMenuMax = 140000;

    const userHourOrder = parseInt(orderHour.split(':').join(''), 10); // Convert user hour order in number to compare it

    if (hourMenuMin <= userHourOrder && userHourOrder <= hourMenuMax) {
        return null;
    } else {
        return { notInTime: 'Nos menus ne sont disponibles que le midi, sur nos horaires d\'ouvertures, entre 11h30 et 14h' }
    }
  };
}
