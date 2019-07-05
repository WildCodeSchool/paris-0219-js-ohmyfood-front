import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { OrderPizzas } from 'src/app/class/order-pizzas';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { CreateFormBasketService } from 'src/app/services/create-form-basket.service';
import { OrderBeverage } from 'src/app/class/order-beverage';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { OrderDessert } from 'src/app/class/order-dessert';
import { DessertsDataService } from 'src/app/services/desserts-data.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  orderStatus: "Livraison"
  enableSubmit: boolean;

  userPizzaChoice: Array<OrderPizzas>; // Get data from service
  userBeveragesChoice: Array<OrderBeverage>;
  userDessertsChoice: Array<OrderDessert>;

  initPrice: boolean;

  total: number; // final result

  constructor(
    private pizzasData: PizzasDataService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private quantityService: QuantitySelectService,
    private createForm: CreateFormBasketService
  ) { }

  ngOnInit() {
    // Récupération du localStorage
  }
}

