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
        dessertsName: [formToCreate.dessName],
        dessPriceTotal: [formToCreate.dessPrice * formToCreate.dessQuantity],
        dessQuantity: [formToCreate.dessQuantity]
      });
      return dessChoice;
    }
  }

  sortOrderForm(formToSort, i, j) {
    formToSort.value[i].pizzasPriceTotal = 0;
    formToSort.value[i].pizzasQuantity = 0;

    formToSort.value[i].pizzasPriceTotal += formToSort.value[j].pizzasPriceTotal; // Sum of price
    formToSort.value[i].pizzasQuantity += formToSort.value[j].pizzasQuantity; // Sum of quantity
    formToSort.removeAt(j); // Remove duplicate
    return formToSort;
  }

}
