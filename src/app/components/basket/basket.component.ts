import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { OrderPizzas } from 'src/app/class/order-pizzas';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { CreateFormBasketService } from 'src/app/services/create-form-basket.service';
import { OrderBeverage } from 'src/app/class/order-beverage';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { OrderDessert } from 'src/app/class/order-dessert';
import { DessertsDataService } from 'src/app/services/desserts-data.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  isToggleBasket: boolean;

  enableSubmit: boolean;

  userPizzaChoice: Array<OrderPizzas>; // Get data from service
  userBeveragesChoice: Array<OrderBeverage>;
  userDessertsChoice: Array<OrderDessert>;

  totalArray: Array<number> = []; // Use to calculate total price

  initPrice: boolean;

  total: number; // final result

  finalOrderForm = this.formBuilder.group({
    pizza: this.formBuilder.array([]),
    beverage: this.formBuilder.array([]),
    dessert: this.formBuilder.array([])
  });

  constructor(
    private pizzasData: PizzasDataService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private formBuilder: FormBuilder,
    private quantityService: QuantitySelectService,
    private createForm: CreateFormBasketService
    ) { }

  ngOnInit() {
    // creation of formArray pizzas
    this.pizzasData.getUserPizzas.subscribe(pizzasChoice => {
      this.userPizzaChoice = pizzasChoice;

      const pizza = this.finalOrderForm.get('pizza') as FormArray;

      for (const key in this.userPizzaChoice) {
        if (this.userPizzaChoice.hasOwnProperty(key)) {
          pizza.push(this.createForm.createOrderForm(this.userPizzaChoice[key]));
        }
      }

      for (let i = 0; i < pizza.value.length; i ++) {
        for (let j = i + 1 ; j < pizza.value.length; j ++ ) {
          if (pizza.value[i].pizzasName === pizza.value[j].pizzasName) {
            this.createForm.sortOrderForm(pizza, i, j);
          }
        }
      }
      this.enableSubmit = true;
      this.totalBasket();
    });

    // Creation of FormArray beverages
    this.beverageData.getUserBeverages.subscribe(beveragesChoice => {
      this.userBeveragesChoice = beveragesChoice;

      const beverage = this.finalOrderForm.get('beverage') as FormArray;

      for (const key in this.userBeveragesChoice) {
        if (this.userBeveragesChoice.hasOwnProperty(key)) {
          beverage.push(this.createForm.createOrderForm(this.userBeveragesChoice[key]));
        }
      }

      for (let i = 0; i < beverage.value.length; i ++) {
        for (let j = i + 1 ; j < beverage.value.length; j ++ ) {
          if (beverage.value[i].bevName === beverage.value[j].bevName) {
            this.createForm.sortOrderForm(beverage, i, j);
          }
        }
      }
      this.enableSubmit = true;
      this.totalBasket();
    });
    // Creation of FormArray desserts
    this.dessertData.getUserDesserts.subscribe(dessertsChoice => {
      this.userDessertsChoice = dessertsChoice;

      const dessert = this.finalOrderForm.get('dessert') as FormArray;

      for (const key in this.userDessertsChoice) {
        if (this.userDessertsChoice.hasOwnProperty(key)) {
          dessert.push(this.createForm.createOrderForm(this.userDessertsChoice[key]));
        }
      }

      for (let i = 0; i < dessert.value.length; i ++) {
        for (let j = i + 1 ; j < dessert.value.length; j ++ ) {
          if (dessert.value[i].dessName === dessert.value[j].dessName) {
            this.createForm.sortOrderForm(dessert, i, j);
          }
        }
      }
      this.enableSubmit = true;
      this.totalBasket();
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

  get beverage(): FormArray {
    return this.finalOrderForm.get('beverage') as FormArray;
  }

  get dessert(): FormArray {
    return this.finalOrderForm.get('dessert') as FormArray;
  }

  onSubmit() {
    const finalOrder = this.finalOrderForm.value;

    this.resetBasket();
  }

  // method to update basket quantity and service's userChoice to have good values in basketComponent
  quantitySelect(operator, index, quantity, ingredient) {
    const check = Object.getOwnPropertyNames(ingredient);

    if (check[0] === 'idPizzas') {
      // give value of selectQuantity result to calculate price behind
      quantity =
      this.finalOrderForm.value.pizza[index].pizzasQuantity = this.quantityService.selectQuantity(operator, quantity);

      this.finalOrderForm.value.pizza[index].pizzasPriceTotal =
      this.quantityService.updatePrice(this.userPizzaChoice[index].pizzPrice, quantity); // update price according to quantity

      // update quantity in userPizzaChoice
      this.userPizzaChoice[index].pizzQuantity = this.finalOrderForm.value.pizza[index].pizzasQuantity;

      const pizza = this.finalOrderForm.get('pizza') as FormArray;

      if (pizza.controls[index].value.pizzasQuantity === 0) {
        pizza.removeAt(index); // remove object from form array when quantity = 0
        this.pizzasData.userChoice.splice(index, 1); // remove object from service's array to be update data
      }

      this.totalBasket();

    } else if (check[0] === 'idBeverages') {
        quantity =
        this.finalOrderForm.value.beverage[index].bevQuantity = this.quantityService.selectQuantity(operator, quantity);

        this.finalOrderForm.value.beverage[index].bevPriceTotal =
        this.quantityService.updatePrice(this.userBeveragesChoice[index].bevPrice, quantity);

        this.userBeveragesChoice[index].bevQuantity = this.finalOrderForm.value.beverage[index].bevQuantity;

        const beverage = this.finalOrderForm.get('beverage') as FormArray;

        if (beverage.controls[index].value.bevQuantity === 0) {
          beverage.removeAt(index); // remove object from form array when quantity = 0
          this.beverageData.userChoice.splice(index, 1);
        }

        this.totalBasket();

    } else if (check[0] === 'idDesserts') {
      quantity =
      this.finalOrderForm.value.dessert[index].dessQuantity = this.quantityService.selectQuantity(operator, quantity);

      this.finalOrderForm.value.dessert[index].dessPriceTotal =
      this.quantityService.updatePrice(this.userDessertsChoice[index].dessPrice, quantity);

      this.userDessertsChoice[index].dessQuantity = this.finalOrderForm.value.dessert[index].dessQuantity;

      const dessert = this.finalOrderForm.get('dessert') as FormArray;

      if (dessert.controls[index].value.dessQuantity === 0) {
        dessert.removeAt(index); // remove object from form array when quantity = 0
        this.dessertData.userChoice.splice(index, 1);
      }

      this.totalBasket();
    }

    if (this.pizza.controls.length === 0 &&
      this.beverage.controls.length === 0 &&
      this.dessert.controls.length === 0) {
        this.enableSubmit = false;
    }
  }

  resetBasket() {
    const pizza = this.finalOrderForm.get('pizza') as FormArray;
    const beverage = this.finalOrderForm.get('beverage') as FormArray;
    const dessert = this.finalOrderForm.get('dessert') as FormArray;

    while (pizza.length > 0) {
      pizza.removeAt(0);
    }

    while (beverage.length > 0) {
      beverage.removeAt(0);
    }

    while (dessert.length > 0) {
      dessert.removeAt(0);
    }

    this.pizzasData.userChoice.splice(0, this.pizzasData.userChoice.length);
    this.beverageData.userChoice.splice(0, this.beverageData.userChoice.length);
    this.dessertData.userChoice.splice(0, this.dessertData.userChoice.length);
    this.enableSubmit = false;

    this.totalBasket();
  }

  totalBasket() {
    this.totalArray = [];
    this.total = 0;

    const reducer = (accumulator, currentValue) => accumulator + currentValue; // Method to calculate max of an array

    for (const iterator of this.pizza.value) {
      this.totalArray.push(iterator.pizzasPriceTotal);
    }

    for (const iterator of this.beverage.value) {
      this.totalArray.push(iterator.bevPriceTotal);
    }

    for (const iterator of this.dessert.value) {
      this.totalArray.push(iterator.dessPriceTotal);
    }

    this.totalArray.length === 0 ? this.total = 0 : this.total = this.totalArray.reduce(reducer);
  }

}
