import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkSaladsIngredients(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const quantity = control.value.map(
      (ingredients: any) => ingredients.saladsIngredientsQuantity
      ).filter(
        (result: number) => result > 0
        );

    if (quantity.length === 0) {
        return { isRequired: 'Merci de sélectionner au moins un ingrédient' };
    } else {
        return null;
    }
  };
}
