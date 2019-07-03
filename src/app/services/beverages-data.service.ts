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

  createOrderBeverage(formResult) { // create object with OrderBeverage Class
    for (const key in formResult) {
      if (formResult.hasOwnProperty(key)) {
        formResult[key].map(test => {
          if (test.bevQuantity > 0) {
            const beveragesChoice = new OrderBeverage(
              test.idBeverages, test.bevName, +test.bevPriceTTC, test.bevQuantity
              );
            this.getUserBeverages.emit(beveragesChoice);
            }
          }
        );
      }
    }
  }
}


