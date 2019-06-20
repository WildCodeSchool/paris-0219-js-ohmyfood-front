import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateFormBasketService {

  constructor(private fb: FormBuilder) { }

  createOrderForm(formToCreate) {
    const pizzChoice = this.fb.group({
      idPizzas: [formToCreate.idPizzas],
      pizzName: [formToCreate.pizzName],
      pizzPriceTotal: [formToCreate.pizzPrice * formToCreate.pizzQuantity],
      pizzQuantity: [formToCreate.pizzQuantity]
    });
    return pizzChoice;
  }

  sortOrderForm(formToSort, i, j) {
    formToSort.value[i].pizzPriceTotal = 0;
    formToSort.value[i].pizzQuantity = 0;

    formToSort.value[i].pizzPriceTotal += formToSort.value[j].pizzPriceTotal; // Sum of price
    formToSort.value[i].pizzQuantity += formToSort.value[j].pizzQuantity; // Sum of quantity
    formToSort.removeAt(j); // Remove duplicate
    return formToSort;
  }

}
