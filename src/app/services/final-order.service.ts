import { Injectable, Output, EventEmitter } from '@angular/core';
import { FinalOrder } from '../class/final-order';

@Injectable({
  providedIn: 'root'
})
export class FinalOrderService {

  @Output()
  getFinalOrder: EventEmitter<any> = new EventEmitter();

  constructor() { }

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
}
