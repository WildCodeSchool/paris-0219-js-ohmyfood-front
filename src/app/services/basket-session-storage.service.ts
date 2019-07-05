import { Injectable } from '@angular/core';
import { OrderDessert } from '../class/order-dessert';
import { OrderBeverage } from '../class/order-beverage';
import { OrderPizzas } from '../class/order-pizzas';

@Injectable({
  providedIn: 'root'
})
export class BasketSessionStorageService {

  constructor() { }

  saveToSessionStorage(form: object[]) {

    if (form.length > 0) {
      const check = Object.getOwnPropertyNames(form[0]);
      const finalCheck = check[0];

      switch (finalCheck) {
      case 'idPizzas' :
        sessionStorage.setItem('pizzas', JSON.stringify(form.map(
          (pizz: OrderPizzas[]) => pizz)
          )
        );
        break;

      case 'idBeverages' :
        sessionStorage.setItem('beverages', JSON.stringify(form.map(
          (bev: OrderBeverage[]) => bev)
          )
        );
        break;

      case 'idDesserts' :
        sessionStorage.setItem('desserts', JSON.stringify(form.map(
          (dess: OrderDessert[]) => dess)
          )
        );
        break;
      default:
      return null;
      }
    }
  }


  clearSessionStorage(form: any) {
    // Remove all if user click on reset basket
    if (form.length === 0) {
      sessionStorage.removeItem('pizzas');
      sessionStorage.removeItem('beverages');
      sessionStorage.removeItem('desserts');
    } else {
        // Clear session storage according to user's choice
        if (form.pizza.length === 0) {
          sessionStorage.removeItem('pizzas');
        }

        if (form.beverage.length === 0) {
          sessionStorage.removeItem('beverages');
        }

        if (form.dessert.length === 0) {
          sessionStorage.removeItem('desserts');
        }
    }
  }
}
