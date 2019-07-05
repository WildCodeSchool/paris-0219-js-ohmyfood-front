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
    if (sessionStorage.getItem('finalOrder')) {
      this.finalOrderRecap = JSON.parse(sessionStorage.getItem('finalOrder'));
    }

    this.finalOrder.getFinalOrder.subscribe((userFinalOrder: any) => {
      if (!sessionStorage.getItem('finalOrder')) {
        sessionStorage.setItem('finalOrder', JSON.stringify(userFinalOrder));
        this.finalOrderRecap = userFinalOrder;
      } else {
        const finalOrderStorage = JSON.parse(sessionStorage.getItem('finalOrder'));
        const finalOrderTransition = {
          pizza: [],
          salad: [],
          beverage: [],
          dessert: [],
        };
        for (const key of Object.entries(userFinalOrder)) {
          switch (key[0]) {
            case 'pizza' :
              finalOrderTransition.pizza.push(key[1]);
              break;
            case 'salad' :
              finalOrderTransition.salad.push(key[1]);
              break;
            case 'beverage' :
              finalOrderTransition.beverage.push(key[1]);
              break;
            case 'dessert' :
              finalOrderTransition.dessert.push(key[1]);
              break;
            default: return null;
          }
        }
        for (const key of Object.entries(finalOrderStorage)) {
          switch (key[0]) {
            case 'pizza' :
              finalOrderTransition.pizza.push(key[1]);
              break;
            case 'salad' :
              finalOrderTransition.salad.push(key[1]);
              break;
            case 'beverage' :
              finalOrderTransition.beverage.push(key[1]);
              break;
            case 'dessert' :
              finalOrderTransition.dessert.push(key[1]);
              break;
            default: return null;
          }
        }

        let test = [... finalOrderTransition.pizza['0']];
        const test2 = [... finalOrderTransition.pizza['1']];
        test = test.map(a => {
          return test2.map(y => {
            if (a.idPizzas === y.idPizzas) {
              a.pizzasPriceTotal += y.pizzasPriceTotal;
              a.pizzasQuantity += y.pizzasQuantity;
              return a;
            }
          });
        });
        console.log(test);

        console.log(test2);
      }
    });
  }
}

