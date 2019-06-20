import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderPizzas } from '../class/order-pizzas';
import { OrderBeverage } from '../class/order-beverage';
import { OrderDessert } from '../class/order-dessert';

@Injectable({
  providedIn: 'root'
})
export class CreateFormBasketService {

  constructor(private fb: FormBuilder) { }

  createOrderForm(formToCreate) {
    if (formToCreate instanceof OrderPizzas) {
      const pizzChoice = this.fb.group({
        idPizzas: [formToCreate.idPizzas],
        pizzasName: [formToCreate.pizzName],
        pizzasPriceTotal: [formToCreate.pizzPrice * formToCreate.pizzQuantity],
        pizzasQuantity: [formToCreate.pizzQuantity]
      });
      return pizzChoice;

    } else if (formToCreate instanceof OrderBeverage) {
      const drinksChoice = this.fb.group({
        idBeverages: [formToCreate.idBeverages],
        bevName: [formToCreate.bevName],
        bevPriceTotal: [formToCreate.bevPrice * formToCreate.bevQuantity],
        bevQuantity: [formToCreate.bevQuantity]
      });
      return drinksChoice;

    } else if (formToCreate instanceof OrderDessert) {
      const dessChoice = this.fb.group({
        idDesserts: [formToCreate.idDesserts],
        dessName: [formToCreate.dessName],
        dessPriceTotal: [formToCreate.dessPrice * formToCreate.dessQuantity],
        dessQuantity: [formToCreate.dessQuantity]
      });
      return dessChoice;
    }
  }

  sortOrderForm(formToSort, i, j) {
    const check = Object.getOwnPropertyNames(formToSort.value[i]); // get property of formToSort to know what form we have to sort

    if (check[0] === 'idPizzas') {
      formToSort.value[i].pizzasPriceTotal = 0;
      formToSort.value[i].pizzasQuantity = 0;

      formToSort.value[i].pizzasPriceTotal += formToSort.value[j].pizzasPriceTotal; // Sum of price
      formToSort.value[i].pizzasQuantity += formToSort.value[j].pizzasQuantity; // Sum of quantity
      formToSort.removeAt(j); // Remove duplicate
      return formToSort;

    } else if (check[0] === 'idBeverages') {
      formToSort.value[i].bevPriceTotal = 0;
      formToSort.value[i].bevQuantity = 0;

      formToSort.value[i].bevPriceTotal += formToSort.value[j].bevPriceTotal; // Sum of price
      formToSort.value[i].bevQuantity += formToSort.value[j].bevQuantity; // Sum of quantity
      formToSort.removeAt(j); // Remove duplicate
      return formToSort;

    } else if (check[0] === 'idDesserts') {
      formToSort.value[i].dessPriceTotal = 0;
      formToSort.value[i].dessQuantity = 0;

      formToSort.value[i].dessPriceTotal += formToSort.value[j].dessPriceTotal; // Sum of price
      formToSort.value[i].dessQuantity += formToSort.value[j].dessQuantity; // Sum of quantity
      formToSort.removeAt(j); // Remove duplicate
      return formToSort;
    }
  }

}
