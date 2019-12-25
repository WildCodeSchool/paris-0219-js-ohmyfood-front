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
export class BasketlocalStorageService {

  constructor() { }

  saveTolocalStorage(form: object[]) {
    if (form.length > 0) {
      const check = Object.getOwnPropertyNames(form[0]);
      const finalCheck = check[0];

      switch (finalCheck) {
      case 'idPizzas' :
        localStorage.setItem('pizzas', JSON.stringify(form.map(
          (pizz: OrderPizzas[]) => pizz)
          )
        );
        break;

      case 'multiBases' :
        localStorage.setItem('salads', JSON.stringify(form.map(
          (salads: OrderSalads[]) => salads)
          )
        );
        break;

      case 'idBeverages' :
        localStorage.setItem('beverages', JSON.stringify(form.map(
          (bev: OrderBeverage[]) => bev)
          )
        );
        break;

      case 'idDesserts' :
        localStorage.setItem('desserts', JSON.stringify(form.map(
          (dess: OrderDessert[]) => dess)
          )
        );
        break;

      case 'pizza' :
        localStorage.setItem('menuPizza', JSON.stringify(form.map(
          (menuPizz: MenuPizza[]) => menuPizz)
          )
        );
        break;

      case 'salad' :
        localStorage.setItem('menuSalad', JSON.stringify(form.map(
          (menuSalad: MenuSalad[]) => menuSalad)
          )
        );
        break;

      default:
      return null;
      }
    }
  }


  clearlocalStorage(form: any, arg: string) {
    // Remove all if user click on reset basket

    if (form.length === 0 && arg === 'reset') {
      localStorage.removeItem('pizzas');
      localStorage.removeItem('salads');
      localStorage.removeItem('beverages');
      localStorage.removeItem('desserts');
      localStorage.removeItem('menuPizza');
      localStorage.removeItem('menuSalad');
    } else {
        // Clear session storage according to user's choice
        if (arg === 'pizza') {
          localStorage.removeItem('pizzas');
        }

        if (arg === 'salad') {
          localStorage.removeItem('salads');
        }

        if (arg === 'beverage') {
          localStorage.removeItem('beverages');
        }

        if (arg === 'dessert') {
          localStorage.removeItem('desserts');
        }

        if (arg === 'menuPizza') {
          localStorage.removeItem('menuPizza');
        }

        if (arg === 'menuSalad') {
          localStorage.removeItem('menuSalad');
        }
    }
  }
}
