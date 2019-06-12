import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDessert } from '../class/order-dessert';

@Injectable({
  providedIn: 'root'
})
export class DessertsDataService {

  dessertsRoute = 'http://localhost:3000/desserts';

  userChoice: Array<OrderDessert> = [];

  constructor(private http: HttpClient) { }

  getDesserts(): Observable<object> {
    return this.http.get(this.dessertsRoute);
  }

  createOrderDessert(formResult) { // create object with OrderDessert Class
    for (const key in formResult) {
      if (formResult.hasOwnProperty(key)) {
        formResult[key].map(test => {
          if (test.dessQuantity > 0) {
            const choice = new OrderDessert(test.idDesserts, test.dessName, test.dessPriceTTC * test.dessQuantity, test.dessQuantity);
            this.userChoice.push(choice);
            }
          }
        );
      }
    }
    if (this.userChoice.length > 1) {
      this.sortUserChoice();
    }
  }

  sortUserChoice() { // Remove duplicate choice
    for (let i = 0; i < this.userChoice.length; i ++) {
      for (let j = i + 1 ; j < this.userChoice.length; j ++ ) {
        if (this.userChoice[i].dessName === this.userChoice[j].dessName) {
          this.userChoice[i].dessPrice += this.userChoice[j].dessPrice; // Sum of price
          this.userChoice[i].dessQuantity += this.userChoice[j].dessQuantity; // Sum of quantity
          this.userChoice.splice(j, 1); // Remove duplicate
        }
      }
    }
  }

}
