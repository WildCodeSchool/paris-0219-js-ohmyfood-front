import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinalOrder } from '../class/final-order';

@Injectable({
  providedIn: 'root'
})
export class FinalOrderService {

  @Output()
  getFinalOrder: EventEmitter<any> = new EventEmitter();

  urlPostFinalOrder = 'http://localhost:3000/confirmOrder';

  finalOrderObject: object;

  dateOrder: Date = new Date();

  constructor(private http: HttpClient) { }

  transfertFinalOrder(finalOrder: any) {
    finalOrder = new FinalOrder(
      finalOrder.pizza,
      finalOrder.salad,
      finalOrder.beverage,
      finalOrder.dessert,
      finalOrder.menuPizza,
      finalOrder.menuSalad
    );
    this.getFinalOrder.emit(finalOrder);
    sessionStorage.setItem('finalOrder', JSON.stringify(finalOrder));
  }

  submitFinalOrder() {
    return this.http.post(this.urlPostFinalOrder, this.finalOrderObject).toPromise();
  }
}
