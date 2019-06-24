import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkSaladsBase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const test  = control.value;
    let count = 0;
    let finalResult: boolean;
    const result = test.map(newTest => newTest.saladsBaseQuantity);

    for (let i = 0; i < result.length; i++) {
      result[i] === true ? count ++ : null;
    }

    count > 2 ? finalResult = false : finalResult = true;

    if (finalResult === true) {
      return null;
    } else {
      return { tooMuchBase: 'Merci de ne sélectionner que deux bases maximum' };
    }
  };
}
