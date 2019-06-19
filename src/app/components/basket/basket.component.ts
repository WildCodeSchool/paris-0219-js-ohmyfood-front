import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { OrderPizzas } from 'src/app/class/order-pizzas';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  isToggleBasket: boolean;

  userPizzaChoice: Array<OrderPizzas>; // Get data from service

  totalArray: Array<number> = []; // Use to calculate total price

  initPrice: boolean;

  total: number; // final result

  finalOrderForm = this.formBuilder.group({
    pizza: this.formBuilder.array([]),
    drinks: this.formBuilder.array([]),
    desserts: this.formBuilder.array([])
  });

  constructor(
    private pizzasData: PizzasDataService,
    private formBuilder: FormBuilder,
    private quantityService: QuantitySelectService
    ) { }

  ngOnInit() {
    this.pizzasData.getUserPizzas.subscribe(pizzasChoice => {
      this.userPizzaChoice = pizzasChoice;

      const pizza = this.finalOrderForm.get('pizza') as FormArray;

      for (const key in this.userPizzaChoice) {
        if (this.userPizzaChoice.hasOwnProperty(key)) {
          const pizzChoice = this.formBuilder.group({
            idPizzas: [this.userPizzaChoice[key].idPizzas],
            pizzName: [this.userPizzaChoice[key].pizzName],
            pizzPriceTotal: [this.userPizzaChoice[key].pizzPrice * this.userPizzaChoice[key].pizzQuantity],
            pizzQuantity: [this.userPizzaChoice[key].pizzQuantity]
          });
          pizza.push(pizzChoice);
        }
      }

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

  quantitySelect(operator, index, quantity) {
    quantity = this.finalOrderForm.value.pizza[index].pizzQuantity = this.quantityService.selectQuantity(operator, quantity);
    this.finalOrderForm.value.pizza[index].pizzPriceTotal =
    this.quantityService.updatePrice(this.userPizzaChoice[index].pizzPrice, quantity);

    const pizza = this.finalOrderForm.get('pizza') as FormArray;
    if (pizza.controls[index].value.pizzQuantity === 0) {
      console.log(pizza);
      pizza.controls[index].patchValue({
        pizzQuantity: 0
      });
      pizza.removeAt(index);
      console.log(this.finalOrderForm);
    }
  }

}
