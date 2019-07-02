import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderSalads } from '../class/order-salads';
import { SaladsBases } from '../class/order-saladsBases';
import { SaladsIngredients } from '../class/order-saladsIngredients';
import { SaladsToppings } from '../class/order-saladsToppings';
import { SaladsSauces } from '../class/order-saladsSauces';

@Injectable({
  providedIn: 'root'
})
export class SaladsDatasService {
  private basePath = 'http://localhost:3000';

  userBase: Array<SaladsBases> = [];
  userIngredients: Array<SaladsIngredients> = [];
  userToppings: Array<SaladsToppings> = [];
  userSauces: SaladsSauces;

  userChoice: Array<OrderSalads> = [];

  @Output()
  public getSalads: EventEmitter<any> = new EventEmitter();

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

  createOrderSalads(formResult: any) {
    const formResultKey = Object.getOwnPropertyNames(formResult); // To check key of formResult and create instance according to key

    if (formResultKey[0] === 'selectBase') {
      formResult.selectBase.map((base: any) => {
        if (base.saladsBaseQuantity) {
          const saladsBase = new SaladsBases(base.idSaladsBase, base.saladsBaseName, base.saladsBasePriceTTC, 1);
          this.userBase.push(saladsBase);
        }
      });
     }

    if (formResultKey[1] === 'selectIngredients') {
      formResult.selectIngredients.map((ingredients: any) => {
        if (ingredients.saladsIngredientsQuantity) {
          const saladsIngredients = new SaladsIngredients(
            ingredients.idSaladsIngredients,
            ingredients.saladsIngredientsName,
            ingredients.saladsIngredientsPriceTTC,
            ingredients.saladsIngredientsQuantity
          );
          this.userIngredients.push(saladsIngredients);
        }
      });
     }

    if (formResultKey[2] === 'selectToppings') {
      formResult.selectToppings.map((toppings: any) => {
        if (toppings.saladsToppingsQuantity) {
          const saladsToppings = new SaladsToppings(
            toppings.idSaladsToppings,
            toppings.saladsToppingsName,
            toppings.saladsToppingsPriceTTC,
            toppings.saladsToppingsQuantity
          );
          this.userToppings.push(saladsToppings);
        }
      });
     }

    if (formResultKey[3] === 'selectSauces') {
      formResult.selectSauces.map((sauces: any) => {
        if (sauces.saladsSaucesQuantity) {
          this.userSauces = new SaladsSauces(
            sauces.idSaladsSauces,
            sauces.saladsSaucesName,
          );
        }
      });
     }
    const userSaladsComposed = new OrderSalads(
      this.userBase,
      this.userIngredients,
      this.userToppings,
      this.userSauces
    );
    this.userChoice.push(userSaladsComposed);
    this.getSalads.emit(this.userChoice);
  }
}
