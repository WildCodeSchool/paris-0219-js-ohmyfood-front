import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkUserPassword(firstUserPassword: string, verifUserPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const firstPassword = control.get(firstUserPassword).value;
    const verifPassword = control.get(verifUserPassword).value;

    if (firstPassword !== verifPassword) {
      return { wrongPassword: 'Le mot de passe de confirmation ne correspond pas à votre premier mot de passe' };
    } else {
        return null;
    }
  };
}
