import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { OrderPizzas } from 'src/app/class/order-pizzas';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  isToggleBasket = false;

  userPizzaChoice: Array<OrderPizzas>;

  constructor(private pizzasData: PizzasDataService) { }

  ngOnInit() {
    this.pizzasData.getUserPizzas.subscribe(pizzasChoice => {
      this.userPizzaChoice = pizzasChoice;
      console.log(this.userPizzaChoice);
    });
  }

  displayToggleBasket(event) {
    event.preventDefault();
    if (this.isToggleBasket === false) {
      this.isToggleBasket = true;
    } else {
      this.isToggleBasket = false;
    }
  }

  onGetUserPizzas($event) {
    console.log($event);
  }

}
