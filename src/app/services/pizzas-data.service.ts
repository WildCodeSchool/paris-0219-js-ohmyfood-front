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

  getPizzasForMenu(): Observable<object> {
    return this.http.get(`${this.pizzasRoute}/menu`);
  }

  getOhMyMardiPrice(): Observable<object> {
    return this.http.get(`${this.pizzasRoute}/ohMyMardi`);
  }

   createOrderPizzas(userPizzaChoice: object) { // create object with OrderDessert Class
    for (const pizza in userPizzaChoice) {
      if (userPizzaChoice.hasOwnProperty(pizza)) {
        userPizzaChoice[pizza].map((userPizza: any) => {
          if (userPizza.pizzQuantity > 0) {
            const pizzasChoice = new OrderPizzas(
              userPizza.idPizzas, userPizza.pizzName, +userPizza.pizzPriceTTC, userPizza.pizzQuantity
              );
            this.getUserPizzas.emit(pizzasChoice);
            }
          }
        );
      }
    }
  }

  createOrderPizzaslocalStorage(object: any) {
    return new OrderPizzas(
      object.idPizzas,
      object.pizzName,
      object.pizzPriceTotal / object.pizzQuantity, // We divide priceTotal by quantity to get good value in basket
      object.pizzQuantity
    );
  }
}
