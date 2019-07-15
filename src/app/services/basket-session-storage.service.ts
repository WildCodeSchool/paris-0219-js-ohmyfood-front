import { Injectable } from '@angular/core';
import { OrderDessert } from '../class/order-dessert';
import { OrderBeverage } from '../class/order-beverage';
import { OrderPizzas } from '../class/order-pizzas';
import { OrderSalads } from '../class/order-salads';
import { MenuPizza } from '../class/menu-pizza';
import { MenuSalad } from '../class/menu-salad';

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

      case 'multiBases' :
        sessionStorage.setItem('salads', JSON.stringify(form.map(
          (salads: OrderSalads[]) => salads)
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

      case 'pizza' :
        sessionStorage.setItem('menuPizza', JSON.stringify(form.map(
          (menuPizz: MenuPizza[]) => menuPizz)
          )
        );
        break;

      case 'salad' :
        sessionStorage.setItem('menuSalad', JSON.stringify(form.map(
          (menuSalad: MenuSalad[]) => menuSalad)
          )
        );
        break;

      default:
      return null;
      }
    }
  }


  clearSessionStorage(form: any, arg: string) {
    // Remove all if user click on reset basket

    if (form.length === 0 && arg === 'reset') {
      sessionStorage.removeItem('pizzas');
      sessionStorage.removeItem('salads');
      sessionStorage.removeItem('beverages');
      sessionStorage.removeItem('desserts');
      sessionStorage.removeItem('menuPizza');
      sessionStorage.removeItem('menuSalad');
    } else {
        // Clear session storage according to user's choice
        if (arg === 'pizza') {
          sessionStorage.removeItem('pizzas');
        }

        if (arg === 'salad') {
          sessionStorage.removeItem('salads');
        }

        if (arg === 'beverage') {
          sessionStorage.removeItem('beverages');
        }

        if (arg === 'dessert') {
          sessionStorage.removeItem('desserts');
        }

        if (arg === 'menuPizza') {
          sessionStorage.removeItem('menuPizza');
        }

        if (arg === 'menuSalad') {
          sessionStorage.removeItem('menuSalad');
        }
    }
  }
}
