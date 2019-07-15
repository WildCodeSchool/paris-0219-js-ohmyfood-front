import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuantitySelectService {

  selectQuantity(operator, quantity) {
    if (operator === '+') {
      quantity ++;
      return quantity;

    } else if (operator === '-' && quantity > 0) {
      quantity --;
      return quantity;

    } else if (quantity === 0) {
      return quantity;
    }
  }
}
