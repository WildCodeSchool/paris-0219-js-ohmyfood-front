import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function deliveryIntervalTime(orderHour: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const hourMenuMin = 113000;
    const hourMenuMax = 140000;

    const userDayOrder = orderHour.split(' ').splice(0, 1).join(''); // Get order's day

    const userHourOrder = orderHour.split(' ').splice(1, 1).join(''); // Get order's hour

    const finalHourOrder = parseInt(userHourOrder.split(':').join(''), 10); // Convert user hour order in number to compare it

    if (
      hourMenuMin <= finalHourOrder &&
      finalHourOrder <= hourMenuMax &&
      userDayOrder !== 'Monday' &&
      userDayOrder !== 'Saturday' &&
      userDayOrder !== 'Sunday'
      ) {
        return null;
    } else {
        return { notInTime: `Nos menus ne sont disponibles que le midi,
                du mardi au vendredi, sur nos horaires d\'ouvertures, entre 11h30 et 14h` };
    }
  };
}
