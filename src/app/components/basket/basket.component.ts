import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { OrderPizzas } from 'src/app/class/order-pizzas';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  isToggleBasket: boolean;

  userPizzaChoice: Array<OrderPizzas>; // Get data from service

  totalArray: Array<number> = []; // Use to calculate total price

  total: number; // final result

  constructor(private pizzasData: PizzasDataService) { }

  ngOnInit() {
    this.pizzasData.getUserPizzas.subscribe(pizzasChoice => {
      this.userPizzaChoice = pizzasChoice;

      const reducer = (accumulator, currentValue) => accumulator + currentValue; // Sum of array's value function

      for (const key in this.userPizzaChoice) {
        if (this.userPizzaChoice.hasOwnProperty(key)) {
          this.totalArray.push(this.userPizzaChoice[key].pizzPrice);
        }
      }
      this.total = 0; // intialize total
      this.total = this.totalArray.reduce(reducer); // Calculate total each time values changes
      this.totalArray = []; // Initialize array
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

}
