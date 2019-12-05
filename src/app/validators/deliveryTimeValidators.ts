import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function deliveryIntervalTime(orderHour: string, isMenu: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const hourMenuMin = 113000;
    const hourMenuMax = 140000;

    const userDayOrder = orderHour.split(' ').splice(0, 1).join(''); // Get order's day

    const userHourOrder = orderHour.split(' ').splice(1, 1).join(''); // Get order's hour

    const finalHourOrder = parseInt(userHourOrder.split(':').join(''), 10); // Convert user hour order in number to compare it

    if (
      hourMenuMin <= finalHourOrder && finalHourOrder <= hourMenuMax && userDayOrder !== 'Monday' &&
      userDayOrder !== 'Saturday' && userDayOrder !== 'Sunday' && isMenu ) {
        return null;

    } else {
        return { notInTime: `Nos menus ne sont disponibles que le midi,
                du mardi au vendredi, sur nos horaires d'ouvertures, entre 11h30 et 14h.
                Il est possible de commander à la carte sur les mêmes horaires d'ouvertures le midi, et le soir entre 19h et 22h,
                du mardi au dimanche`,
              notInTimeDetailOrderPage: `Vous pouvez commander sur nos horaires d'ouverture,
              à savoir le midi entre 11h30 et 14 et le soir, de 19h à 22h.` };
    }
  };
}
