import { Injectable } from '@angular/core';
import { OrderDessert } from '../class/order-dessert';
import { OrderBeverage } from '../class/order-beverage';

@Injectable({
  providedIn: 'root'
})
export class BasketSessionStorageService {

  constructor() { }

  saveToSessionStorage(reset: string, form: object[]) {
    if (form.length > 0) {
      const check = Object.getOwnPropertyNames(form[0]);
      const finalCheck = check[0];

      switch (finalCheck) {
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
      }
    }

    if (reset === 'reset') {
      sessionStorage.removeItem('beverages');
      sessionStorage.removeItem('desserts');
    }
  }
}
