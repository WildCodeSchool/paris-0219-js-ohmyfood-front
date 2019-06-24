import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderPizzas } from '../class/order-pizzas';

@Injectable({
  providedIn: 'root'
})
export class PizzasDataService {

  pizzasRoute = 'http://localhost:3000/pizzas';

  userChoice: Array<OrderPizzas> = [];

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
            const choice = new OrderPizzas(test.idPizzas, test.pizzName, +test.pizzPriceTTC, test.pizzQuantity);
            this.userChoice.push(choice);
            }
          }
        );
      }
    }
    if (this.userChoice.length > 1) {
       this.sortUserChoice();
    }
    this.getUserPizzas.emit(this.userChoice);
  }

   sortUserChoice() { // Remove duplicate choice
    for (let i = 0; i < this.userChoice.length; i ++) {
      for (let j = i + 1 ; j < this.userChoice.length; j ++ ) {
        if (this.userChoice[i].pizzName === this.userChoice[j].pizzName) {
          this.userChoice[i].pizzQuantity += this.userChoice[j].pizzQuantity; // Sum of quantity
          this.userChoice.splice(j, 1); // Remove duplicate
        }
      }
    }
  }

}
