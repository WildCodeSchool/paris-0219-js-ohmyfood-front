import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderBeverage } from '../class/order-beverage';

@Injectable({
  providedIn: 'root'
})
export class BeveragesDataService {

  beveragesRoute = 'http://localhost:3000/beverages';

  userChoice: Array<OrderBeverage> = [];

  @Output()
  public getUserBeverages: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getBeverages(): Observable<object> {
    return this.http.get(this.beveragesRoute);
  }

  createOrderBeverage(formResult) { // create object with OrderBeverage Class
    for (const key in formResult) {
      if (formResult.hasOwnProperty(key)) {
        formResult[key].map(test => {
          if (test.bevQuantity > 0) {
            const choice = new OrderBeverage(test.idBeverages, test.bevName, test.bevPriceTTC * test.bevQuantity, test.bevQuantity);
            this.userChoice.push(choice);
            }
          }
        );
      }
    }
    if (this.userChoice.length > 1) {
      this.sortUserChoice();
    }
    this.getUserBeverages.emit(this.userChoice);
  }

  sortUserChoice() { // Remove duplicate choice
    for (let i = 0; i < this.userChoice.length; i ++) {
      for (let j = i + 1 ; j < this.userChoice.length; j ++ ) {
        if (this.userChoice[i].bevName === this.userChoice[j].bevName) {
          this.userChoice[i].bevPrice += this.userChoice[j].bevPrice; // Sum of price
          this.userChoice[i].bevQuantity += this.userChoice[j].bevQuantity; // Sum of quantity
          this.userChoice.splice(j, 1); // Remove duplicate
        }
      }
    }
  }

}


