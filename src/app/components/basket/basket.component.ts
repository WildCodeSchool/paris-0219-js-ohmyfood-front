import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { OrderPizzas } from 'src/app/class/order-pizzas';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

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

  finalOrderForm = this.formBuilder.group({
    pizza: this.formBuilder.array([]),
    drinks: this.formBuilder.array([]),
    desserts: this.formBuilder.array([])
  });

  constructor(
    private pizzasData: PizzasDataService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.pizzasData.getUserPizzas.subscribe(pizzasChoice => {
      this.userPizzaChoice = pizzasChoice;

      console.log(this.userPizzaChoice);

      const pizza = this.finalOrderForm.get('pizza') as FormArray;

      for (const key in this.userPizzaChoice) {
        if (this.userPizzaChoice.hasOwnProperty(key)) {
          const pizzChoice = this.formBuilder.group({
            idPizzas: [this.userPizzaChoice[key].idPizzas],
            pizzName: [this.userPizzaChoice[key].pizzName],
            pizzPriceTotal: [this.userPizzaChoice[key].pizzPrice],
            pizzQuantity: [this.userPizzaChoice[key].pizzQuantity]
          });
          pizza.push(pizzChoice);
        }
      }

      if (pizza.value.length > 1) {
        for (let i = 0; i < pizza.value.length; i ++) {
          for (let j = i + 1 ; j < pizza.value.length; j ++ ) {
            if (pizza.value[i].pizzName === pizza.value[j].pizzName) {
              pizza.value[i].pizzPriceTotal = 0;
              pizza.value[i].pizzQuantity = 0;
              pizza.value[i].pizzPriceTotal += pizza.value[j].pizzPriceTotal; // Sum of price
              pizza.value[i].pizzQuantity += pizza.value[j].pizzQuantity; // Sum of quantity
              pizza.removeAt(j); // Remove duplicate
            }
          }
        }
      }

      console.log(this.finalOrderForm);
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

  get pizza(): FormArray {
    return this.finalOrderForm.get('pizza') as FormArray;
  }

  onSubmit() {
    const finalOrder = this.finalOrderForm.value;
    console.log(finalOrder);
  }

}
