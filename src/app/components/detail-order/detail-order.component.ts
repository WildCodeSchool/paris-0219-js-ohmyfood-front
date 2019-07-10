import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { OrderPizzas } from 'src/app/class/order-pizzas';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { CreateFormBasketService } from 'src/app/services/create-form-basket.service';
import { OrderBeverage } from 'src/app/class/order-beverage';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { OrderDessert } from 'src/app/class/order-dessert';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FinalOrder } from 'src/app/class/final-order';
import { FinalOrderService } from 'src/app/services/final-order.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  orderStatus: 'Livraison';
  enableSubmit: boolean;

  userPizzaChoice: Array<OrderPizzas>; // Get data from service
  userBeveragesChoice: Array<OrderBeverage>;
  userDessertsChoice: Array<OrderDessert>;

  finalOrderRecap: FinalOrder;

  initPrice: boolean;

  total: number; // final result

  constructor(
    private pizzasData: PizzasDataService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private quantityService: QuantitySelectService,
    private createForm: CreateFormBasketService,
    private finalOrder: FinalOrderService
  ) { }

  ngOnInit() {
    // Get item from session storage if there is something in it
    if (sessionStorage.getItem('finalOrder')) {
      this.finalOrderRecap = JSON.parse(sessionStorage.getItem('finalOrder'));
    }

    // Subscribe to output from basket component
    const finalOrderSubscription = this.finalOrder.getFinalOrder.subscribe((userFinalOrder: any) => {
      let finalOrderStorage: any;

      sessionStorage.getItem('finalOrder') ?
      finalOrderStorage = JSON.parse(sessionStorage.getItem('finalOrder')) :
      sessionStorage.setItem('finalOrder', JSON.stringify(userFinalOrder));

      // Initialize variables to sort duplicate data
      const pizza = userFinalOrder.pizza;
      const salad = userFinalOrder.salad;
      const beverage = userFinalOrder.beverage;
      const dessert = userFinalOrder.dessert;

      // For each key, group information to sort them behind
      if (finalOrderStorage !== undefined) {
        finalOrderStorage.salad.map((salads: any) => {
          salad.push(salads);
        });
      }

      if (finalOrderStorage !== undefined) {
        finalOrderStorage.pizza.map((pizzas: any) => {
          pizza.push(pizzas);
        });
      }

      if (finalOrderStorage !== undefined) {
        finalOrderStorage.beverage.map((beverages: any) => {
          beverage.push(beverages);
        });
      }

      if (finalOrderStorage !== undefined) {
        finalOrderStorage.dessert.map((desserts: any) => {
          dessert.push(desserts);
        });
      }

      // Sort array to avoid duplicate
      for (let i = 0; i < pizza.length; i ++ ) {
        for (let j = i + 1; j < pizza.length; j ++) {
          if (pizza[i].pizzName === pizza[j].pizzName) {
            pizza[i].pizzQuantity += pizza[j].pizzQuantity;
            pizza[i].pizzPriceTotal += pizza[j].pizzPriceTotal;
            pizza.splice(j, 1);
          }
        }
      }

      for (let i = 0; i < beverage.length; i ++ ) {
        for (let j = i + 1; j < beverage.length; j ++) {
          if (beverage[i].bevName === beverage[j].bevName) {
            beverage[i].bevQuantity += beverage[j].bevQuantity;
            beverage[i].bevPriceTotal += beverage[j].bevPriceTotal;
            beverage.splice(j, 1);
          }
        }
      }

      for (let i = 0; i < dessert.length; i ++ ) {
        for (let j = i + 1; j < dessert.length; j ++) {
          if (dessert[i].dessName === dessert[j].dessName) {
            dessert[i].dessQuantity += dessert[j].dessQuantity;
            dessert[i].dessPriceTotal += dessert[j].dessPriceTotal;
            dessert.splice(j, 1);
          }
        }
      }

      // Get good values
      this.finalOrderRecap = new FinalOrder(
          pizza,
          salad,
          beverage,
          dessert
        );

      sessionStorage.setItem('finalOrder', JSON.stringify(this.finalOrderRecap)); // Save new finalOrder in session storage
      finalOrderSubscription.unsubscribe();
    });
  }

  //html gestion

  quantitySelect(operator: string, i: number, quantity: number, elType: string) {
    let abrevElType = '';
    switch (elType) {
      case 'pizza': abrevElType = "pizz";
        break;
      case 'beverage': abrevElType = "bev";
        break;
      case 'dessert': abrevElType = "dess";
        break;
      case 'salad': abrevElType = "saladsComposed";
        break;
      default: null;
        break;
    }
    
    let abrevElTypeQtt = abrevElType + 'Quantity';
    let abrevElTypeTotPrice;
    if (abrevElType === 'salad') {
      abrevElTypeTotPrice = abrevElType + 'TotalPrice'
    }else {
      abrevElTypeTotPrice = abrevElType + 'PriceTotal'
    }

    if (operator === '+') {
      this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeQtt}`] += 1;
      this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeTotPrice}`] -= this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeTotPrice}`]*(quantity +1)
    }
    if (operator === '-') {
      if (quantity > 0) {
        this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeQtt}`] -= 1;
        this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeTotPrice}`] -= this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeTotPrice}`]*(quantity -1)
      }else {

      }
    }
    sessionStorage.setItem('finalOrder', JSON.stringify(this.finalOrderRecap))
  }
}

