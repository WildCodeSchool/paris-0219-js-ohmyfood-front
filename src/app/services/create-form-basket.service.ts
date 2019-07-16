import { Injectable } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { OrderPizzas } from '../class/order-pizzas';
import { OrderBeverage } from '../class/order-beverage';
import { OrderDessert } from '../class/order-dessert';
import { OrderSalads } from '../class/order-salads';
import { MenuPizza } from '../class/menu-pizza';
import { MenuSalad } from '../class/menu-salad';

@Injectable({
  providedIn: 'root'
})
export class CreateFormBasketService {

  constructor(private fb: FormBuilder) { }

  createOrderForm(formToCreate: object) {
    if (formToCreate instanceof OrderPizzas) {
      const pizzChoice = this.fb.group({
        idPizzas: formToCreate.idPizzas,
        pizzName: formToCreate.pizzName,
        pizzPriceTotal: formToCreate.pizzPrice * formToCreate.pizzQuantity,
        pizzQuantity: formToCreate.pizzQuantity
      });
      return pizzChoice;

    } else if (formToCreate instanceof OrderSalads) {
      // To create saladForm, we need to create formGroup with form array for each part of Salad to get all data we need.
      // We push this formGroup in finalOrderForm key 'salad'

      const saladChoice = this.fb.group({
        multiBases: this.fb.array([]),
        multiIngredients: this.fb.array([]),
        multiToppings: this.fb.array([]),
        multiSauces: { },
        saladsComposedQuantity: formToCreate.orderSaladsQuantity,
        saladsComposedPriceTotal: formToCreate.orderSaladsPriceTotal
      });

      const multiBases = saladChoice.get('multiBases') as FormArray;

      for (const iterator of formToCreate.orderSaladsBases) {

        const base = this.fb.group({
          idSaladsBase: iterator.idSaladsBases,
          multiBasesQuantity: iterator.saladsBasesQuantity,
          basesName: iterator.saladsBasesName,
          basesPrice: +iterator.saladsBasesPriceTTC * iterator.saladsBasesQuantity
        });
        multiBases.push(base);
      }

      const multiIngredients = saladChoice.get('multiIngredients') as FormArray;

      for (const iterator of formToCreate.orderSaladsIngredients) {
        const ingredient = this.fb.group({
          idSaladsIngredients: iterator.idSaladsIngredients,
          multiIngredientsQuantity: iterator.saladsIngredientsQuantity,
          ingredientsName: iterator.saladsIngredientsName,
          ingredientsPrice: +iterator.saladsIngredientsPriceTTC * iterator.saladsIngredientsQuantity
        });
        multiIngredients.push(ingredient);
      }

      const multiToppings = saladChoice.get('multiToppings') as FormArray;

      for (const iterator of formToCreate.orderSaladsToppings) {
        const topping = this.fb.group({
          idSaladsToppings: iterator.idSaladsToppings,
          multiToppingsQuantity: iterator.saladsToppingsQuantity,
          toppingsName: iterator.saladsToppingsName,
          toppingsPrice: +iterator.saladsToppingsPriceTTC * iterator.saladsToppingsQuantity
        });
        multiToppings.push(topping);
      }

      if (formToCreate.orderSaladsSauces.idSaladsSauces !== null) {
          saladChoice.controls.multiSauces.patchValue({
            idSaladsSauces: formToCreate.orderSaladsSauces.idSaladsSauces,
            saladsSaucesName: formToCreate.orderSaladsSauces.saladsSaucesName
            });

        } else {
          saladChoice.controls.multiSauces.patchValue({
            idSaladsSauces: 0,
            saladsSaucesName: 'Pas de sauce sélectionnée'
          });
        }
      return saladChoice;

    } else if (formToCreate instanceof OrderBeverage) {
      const drinksChoice = this.fb.group({
        idBeverages: formToCreate.idBeverages,
        bevName: formToCreate.bevName,
        bevPriceTotal: formToCreate.bevPrice * formToCreate.bevQuantity,
        bevQuantity: formToCreate.bevQuantity
      });
      return drinksChoice;

    } else if (formToCreate instanceof OrderDessert) {
      const dessChoice = this.fb.group({
        idDesserts: formToCreate.idDesserts,
        dessName: formToCreate.dessName,
        dessPriceTotal: formToCreate.dessPrice * formToCreate.dessQuantity,
        dessQuantity: formToCreate.dessQuantity
      });
      return dessChoice;

    } else if (formToCreate instanceof MenuPizza) {
      const menuPizzChoice = this.fb.group({
        pizza: formToCreate.pizza,
        beverage: formToCreate.beverage,
        dessert: formToCreate.dessert,
        menuPizzPriceTotal: formToCreate.menuPizzPriceTotal,
        menuPizzQuantity: formToCreate.menuPizzQuantity
      });
      return menuPizzChoice;

    } else if (formToCreate instanceof MenuSalad) {

      let menuSaladChoice: FormGroup;

      if ((formToCreate.beverage === undefined || formToCreate.beverage === null) &&
          (formToCreate.dessert !== undefined || formToCreate.dessert !== null)) {

        menuSaladChoice = this.fb.group({
          salad: formToCreate.salad,
          beverage: { bevName: 'Pas de boisson sélectionnée' },
          dessert: formToCreate.dessert,
          menuSaladPriceTotal: formToCreate.menuSaladPriceTotal,
          menuSaladQuantity: formToCreate.menuSaladQuantity
        });
        return menuSaladChoice;

      } else if ((formToCreate.dessert === undefined || formToCreate.dessert === null) &&
          (formToCreate.beverage !== undefined || formToCreate.beverage !== null)) {

        menuSaladChoice = this.fb.group({
          salad: formToCreate.salad,
          beverage: formToCreate.beverage,
          dessert: { dessName: 'Pas de dessert sélectionné' },
          menuSaladPriceTotal: formToCreate.menuSaladPriceTotal,
          menuSaladQuantity: formToCreate.menuSaladQuantity
        });
        return menuSaladChoice;

      } else if ((formToCreate.dessert === undefined || formToCreate.dessert === null) &&
          (formToCreate.beverage === undefined || formToCreate.beverage === null)) {

        menuSaladChoice = this.fb.group({
          salad: formToCreate.salad,
          beverage: { bevName: 'Pas de boisson sélectionnée' },
          dessert: { dessName: 'Pas de dessert sélectionné' },
          menuSaladPriceTotal: formToCreate.menuSaladPriceTotal,
          menuSaladQuantity: formToCreate.menuSaladQuantity
        });
        return menuSaladChoice;

      } else {
        menuSaladChoice = this.fb.group({
          salad: formToCreate.salad,
          beverage: formToCreate.beverage,
          dessert: formToCreate.dessert,
          menuSaladPriceTotal: formToCreate.menuSaladPriceTotal,
          menuSaladQuantity: formToCreate.menuSaladQuantity
        });
        return menuSaladChoice;
      }
    }
  }

  sortOrderForm(formToSort: any, i: number, j: number) {
    const check = Object.getOwnPropertyNames(formToSort.value[i]); // get property of formToSort to know what form we have to sort
    if (check[0] === 'idPizzas') {
      formToSort.value[i].pizzPriceTotal += formToSort.value[j].pizzPriceTotal; // Sum of price
      formToSort.value[i].pizzQuantity += formToSort.value[j].pizzQuantity; // Sum of quantity
      formToSort.removeAt(j); // Remove duplicate
      return formToSort;

    } else if (check[0] === 'idBeverages') {

      formToSort.value[i].bevPriceTotal += formToSort.value[j].bevPriceTotal; // Sum of price
      formToSort.value[i].bevQuantity += formToSort.value[j].bevQuantity; // Sum of quantity
      formToSort.removeAt(j); // Remove duplicate
      return formToSort;

    } else if (check[0] === 'idDesserts') {

      formToSort.value[i].dessPriceTotal += formToSort.value[j].dessPriceTotal; // Sum of price
      formToSort.value[i].dessQuantity += formToSort.value[j].dessQuantity; // Sum of quantity
      formToSort.removeAt(j); // Remove duplicate
      return formToSort;
    }
  }

}
