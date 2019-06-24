import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderSalads } from '../class/order-salads';

@Injectable({
  providedIn: 'root'
})
export class SaladsDatasService {
  private basePath = 'http://localhost:3000';

  saladsSaucesFormTable;
  saladsIngredientsFormTable;
  saladsBasesFormTable;
  saladsToppingsFormTable;

  userChoice: Array<OrderSalads> = [];

  constructor(private http: HttpClient) { }

  addSaladsSauces(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsSauces`);
  }

  addSaladsBases(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsbase`);
  }
  addSaladsIngredients(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsIngredients`);
  }
  addSaladsToppings(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsToppings`);
  }

  createOrderSalads(formResult) {
    for (const key in formResult) {
     if (formResult.hasOwnProperty(key)) {
       formResult[key].map(test => {
         if (test.saladsIngredientsQuantity > 0) {

         }
       })
     }
    }
  }
}
