import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDessert } from '../class/order-dessert';

@Injectable({
  providedIn: 'root'
})
export class DessertsDataService {

  dessertsRoute = 'http://localhost:3000/desserts';

  @Output()
  public getUserDesserts: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getDesserts(): Observable<object> {
    return this.http.get(this.dessertsRoute);
  }

  createOrderDessert(userDessertChoice: object) { // create object with OrderDessert Class
    for (const dessert in userDessertChoice) {
      if (userDessertChoice.hasOwnProperty(dessert)) {
        userDessertChoice[dessert].map((userDessert: any) => {
          if (userDessert.dessQuantity > 0) {
            const dessertsChoice = new OrderDessert(
              userDessert.idDesserts, userDessert.dessName, +userDessert.dessPriceTTC, userDessert.dessQuantity
              );
            this.getUserDesserts.emit(dessertsChoice);
            }
          }
        );
      }
    }
  }

  createOrderDessertslocalStorage(object: any) {
    return new OrderDessert(
      object.idDesserts,
      object.dessName,
      object.dessPriceTotal / object.dessQuantity, // We divide priceTotal by quantity to get good value in basket
      object.dessQuantity
    );
  }

}
