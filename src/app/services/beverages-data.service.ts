import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderBeverage } from '../class/order-beverage';

@Injectable({
  providedIn: 'root'
})
export class BeveragesDataService {

  beveragesRoute = 'http://localhost:3000/beverages';

  @Output()
  public getUserBeverages: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getBeverages(): Observable<object> {
    return this.http.get(this.beveragesRoute);
  }

  createOrderBeverage(userBeverageChoice: object) { // create object with OrderBeverage Class
    for (const beverage in userBeverageChoice) {
      if (userBeverageChoice.hasOwnProperty(beverage)) {
        userBeverageChoice[beverage].map((userBeverage: any) => {
          if (userBeverage.bevQuantity > 0) {
            const beveragesChoice = new OrderBeverage(
              userBeverage.idBeverages, userBeverage.bevName, +userBeverage.bevPriceTTC, userBeverage.bevQuantity
              );
            this.getUserBeverages.emit(beveragesChoice);
            }
          }
        );
      }
    }
  }

  createOrderBeveragelocalStorage(object: any) {
    return new OrderBeverage(
      object.idBeverages,
      object.bevName,
      object.bevPriceTotal / object.bevQuantity, // We divide priceTotal by quantity to get good value in basket
      object.bevQuantity
    );
  }
}


