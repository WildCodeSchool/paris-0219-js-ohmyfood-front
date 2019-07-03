import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderPizzas } from '../class/order-pizzas';

@Injectable({
  providedIn: 'root'
})
export class PizzasDataService {

  pizzasRoute = 'http://localhost:3000/pizzas';

  @Output()
  public getUserPizzas: EventEmitter<any> = new EventEmitter(); // To transfert data to basketComponent

  constructor(private http: HttpClient) { }

  getPizzas(): Observable<object> {
    return this.http.get(this.pizzasRoute);
  }

   createOrderPizzas(formResult) { // create object with OrderDessert Class
    for (const key in formResult) {
      if (formResult.hasOwnProperty(key)) {
        formResult[key].map(test => {
          if (test.pizzQuantity > 0) {
            const pizzasChoice = new OrderPizzas(
              test.idPizzas, test.pizzName, +test.pizzPriceTTC, test.pizzQuantity
              );
            this.getUserPizzas.emit(pizzasChoice);
            }
          }
        );
      }
    }
  }
}
