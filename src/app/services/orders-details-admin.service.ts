import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdersDetailsAdmin } from '../class/orders-details-admin';

@Injectable({
  providedIn: 'root'
})
export class OrdersDetailsAdminService {

  detailsOrdersAdminRoute = 'http://localhost:3000/confirmOrder';

  constructor(private http: HttpClient) { }

  getDetailsOrdersAdmin(): Observable<object> {
    return this.http.get(this.detailsOrdersAdminRoute);
  }

  getDetailsOrdersArchivedAdmin(): Observable<object> {
    return this.http.get(`${this.detailsOrdersAdminRoute}/archive` );
  }

  archiveOrdersAdmin(orderToArchive: OrdersDetailsAdmin) {
    return this.http.put(this.detailsOrdersAdminRoute, orderToArchive, { responseType: 'text'} );
  }

  deleteOrdersAdmin(orderToDelete: OrdersDetailsAdmin) {
    return this.http.delete(`${this.detailsOrdersAdminRoute}/?orderId=${orderToDelete.idOrder}`, { responseType: 'text' });
  }

  // Create base array with name and quantity separate to better display them in template
  createBaseOrderDetail(saladsComposed: any) {
    const basesDetailsOrdersList: Array<object> = []; // final result
    let { bases } = saladsComposed; // Get data we need to split them

    // Check if bases is null to avoid error (split of null make error)
    if (bases !== null) {
      bases = bases.split(',').join(' ').split(' '); // Separation of data
      let nameBase = '';

      for (let i = 0; i < bases.length; i ++) {
        // check if value is a number
        if (isNaN(bases[i])) {
          nameBase += bases[i];
          if (isNaN(bases[i + 1])) {
            nameBase += ' ';
          }
        } else {
          // Create base object to push it in final result array
          const baseDetailOrder = {
            baseName: nameBase,
            baseQuantity: Number.parseInt(bases[i], 10)
          };
          basesDetailsOrdersList.push(baseDetailOrder);
          // empty variable for next iteration
          nameBase = '';
        }
      }
      return basesDetailsOrdersList;
    }
  }

  createIngredientsOrderDetail(saladsComposed: any) {
    const ingredientsDetailsOrdersList: Array<object> = []; // final result
    let { ingredients } = saladsComposed; // Get data we need to split them

    if (ingredients !== null) {
      ingredients = ingredients.split(',').join(' ').split(' '); // Separation of data
      let nameIngredients = '';

      for (let i = 0; i < ingredients.length; i ++) {
        // check if value is a number
        if (isNaN(ingredients[i])) {
          nameIngredients += ingredients[i];
          if (isNaN(ingredients[i + 1])) {
            nameIngredients += ' ';
          }
        } else {
          // Create ingredient object to push it in final result array
          const ingredientDetailOrder = {
            ingredientName: nameIngredients,
            ingredientQuantity: Number.parseInt(ingredients[i], 10)
          };
          ingredientsDetailsOrdersList.push(ingredientDetailOrder);
          // empty variable for next iteration
          nameIngredients = '';
        }
      }
      return ingredientsDetailsOrdersList;
    }
  }

  createToppingsOrderDetail(saladsComposed: any) {
    const toppingsDetailsOrdersList: Array<object> = []; // final result
    let { toppings } = saladsComposed; // Get data we need to split them

    if (toppings !== null) {
      toppings = toppings.split(',').join(' ').split(' '); // Separation of data
      let nameToppings = '';

      for (let i = 0; i < toppings.length; i ++) {
        // check if value is a number
        if (isNaN(toppings[i])) {
          nameToppings += toppings[i];
          if (isNaN(toppings[i + 1])) {
            nameToppings += ' ';
          }
        } else {
            // Create ingredient object to push it in final result array
            const toppingsDetailOrder = {
            toppingName: nameToppings,
            toppingQuantity: Number.parseInt(toppings[i], 10)
          };
            toppingsDetailsOrdersList.push(toppingsDetailOrder);
            // empty variable for next iteration
            nameToppings = '';
          }
      }
      return toppingsDetailsOrdersList;
    }
  }

}
