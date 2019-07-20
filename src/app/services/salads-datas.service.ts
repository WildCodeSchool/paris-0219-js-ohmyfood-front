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
  // Route to back
  private basePath = 'http://localhost:3000';

  userBase: Array<SaladsBases> = [];
  userIngredients: Array<SaladsIngredients> = [];
  userToppings: Array<SaladsToppings> = [];
  userSauces: SaladsSauces;

  totalPriceSaladsComposed: Array<number> = [];

  @Output()
  public getSalads: EventEmitter<any> = new EventEmitter();

  @Output()
  public getSaladsForMenu: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  addSaladsSauces(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsSauces`);
  }

  addSaladsBases(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsBase`);
  }
  addSaladsIngredients(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsIngredients`);
  }
  addSaladsToppings(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsToppings`);
  }

  createOrderSalads(formResult: any, menu: boolean) {
    const formResultKey = Object.getOwnPropertyNames(formResult); // To check key of formResult and create instance according to key
    if (formResultKey[0] === 'selectBase') {
      formResult.selectBase.map((base: any) => {
        if (base.saladsBaseQuantity) {
          const saladsBase = new SaladsBases(
            base.idSaladsBase,
            base.saladsBaseName,
            base.saladsBasePriceTTC,
            1
          );
          this.userBase.push(saladsBase);
          this.totalPriceSaladsComposed.push(
            +saladsBase.saladsBasesPriceTTC * saladsBase.saladsBasesQuantity
            );
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
          this.totalPriceSaladsComposed.push(
            +saladsIngredients.saladsIngredientsPriceTTC * saladsIngredients.saladsIngredientsQuantity
            );
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
          this.totalPriceSaladsComposed.push(
            +saladsToppings.saladsToppingsPriceTTC * saladsToppings.saladsToppingsQuantity
            );
        }
      });
     }

    if (formResultKey[3] === 'selectSauces') {
      for (const sauces of formResult.selectSauces) {
        if (sauces.saladsSaucesQuantity) {
          this.userSauces = new SaladsSauces(
            sauces.idSaladsSauces,
            sauces.saladsSaucesName
          );
          break;
        }

        this.userSauces = new SaladsSauces(
          0,
          'Pas de sauce sélectionnée'
        );
      }
     }

    // To calculate salad composed total price
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

    const finalPrice = this.totalPriceSaladsComposed.reduce(reducer);

    const userSaladsComposed = new OrderSalads(
      this.userBase,
      this.userIngredients,
      this.userToppings,
      this.userSauces,
      finalPrice,
      1
    );

    // Emit userSaladsComposed in basket or in saladMenuComponent according to boolean in argument
    menu ? this.getSaladsForMenu.emit(userSaladsComposed) : this.getSalads.emit(userSaladsComposed);

    // To reinitialize value to avoid duplicate salad
    this.userBase = [];
    this.userIngredients = [];
    this.userToppings = [];
    this.totalPriceSaladsComposed = [];
    this.userSauces = null;
  }

  createOrderSaladsSessionStorage(object: any) {
    for (let base of object.multiBases) {
      base = new SaladsBases(
        base.idSaladsBase,
        base.basesName,
        base.basesPrice,
        base.multiBasesQuantity
      );

      this.userBase.push(base);
    }

    for (let ingredients of object.multiIngredients) {
      ingredients = new SaladsIngredients(
        ingredients.idSaladsIngredients,
        ingredients.ingredientsName,
        ingredients.ingredientsPrice,
        ingredients.multiIngredientsQuantity
      );

      this.userIngredients.push(ingredients);
    }

    for (let toppings of object.multiToppings) {
      toppings = new SaladsToppings(
        toppings.idSaladsToppings,
        toppings.toppingsName,
        toppings.toppingsPrice,
        toppings.multiToppingsQuantity
      );
      this.userToppings.push(toppings);
    }

    this.userSauces = new SaladsSauces(
        object.multiSauces.idSaladsSauces,
        object.multiSauces.saladsSaucesName
      );

    const saladOrder = new OrderSalads(
      this.userBase,
      this.userIngredients,
      this.userToppings,
      this.userSauces,
      object.saladsComposedPriceTotal,
      object.saladsComposedQuantity
    );

    // To reinitialize value to avoid duplicate salad
    this.userBase = [];
    this.userIngredients = [];
    this.userToppings = [];
    this.userSauces = null;

    return saladOrder;
  }
}
