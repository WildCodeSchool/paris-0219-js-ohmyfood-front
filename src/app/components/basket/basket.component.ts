import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { FormBuilder, FormArray, Form } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { CreateFormBasketService } from 'src/app/services/create-form-basket.service';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';
import { BasketSessionStorageService } from 'src/app/services/basket-session-storage.service';
import { OrderBeverage } from 'src/app/class/order-beverage';
import { OrderDessert } from 'src/app/class/order-dessert';
import { OrderSalads } from 'src/app/class/order-salads';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  isToggleBasket: boolean; // To toggle basket

  enableSubmit: boolean; // To enable submit button

  totalArray: Array<number> = []; // Use to calculate total price

  total: number; // final result

  finalOrderForm = this.formBuilder.group({
    pizza: this.formBuilder.array([]),
    salad: this.formBuilder.array([]),
    beverage: this.formBuilder.array([]),
    dessert: this.formBuilder.array([])
  });

  constructor(
    private pizzasData: PizzasDataService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private formBuilder: FormBuilder,
    private quantityService: QuantitySelectService,
    private createForm: CreateFormBasketService,
    private saladsData: SaladsDatasService,
    private sessionStorage: BasketSessionStorageService
    ) { }

  ngOnInit() {

    // Get item from local storage to update basket
    const storageBeverages = sessionStorage.getItem('beverages') ? // If there is key in session storage, get it in variable
    JSON.parse(sessionStorage.getItem('beverages')) : [];

    const storageDesserts = sessionStorage.getItem('desserts') ?
    JSON.parse(sessionStorage.getItem('desserts')) : [];

    const storagePizzas = sessionStorage.getItem('pizzas') ?
    JSON.parse(sessionStorage.getItem('pizzas')) : [];

    // Create Form group to push it in formArray of final order to update basket with good value
    const beverages = this.finalOrderForm.get('beverage') as FormArray;
    const desserts = this.finalOrderForm.get('dessert') as FormArray;
    const pizzas = this.finalOrderForm.get('pizza') as FormArray;

    for (const beverage of storageBeverages) {
      const bev = this.beverageData.createOrderBeverageSessionStorage(beverage); // Create orderBeverage
      beverages.push(this.createForm.createOrderForm(bev)); // Create formGroup with object and push it in formArray
    }

    for (const dessert of storageDesserts) {
      const dess = this.dessertData.createOrderDessertsSessionStorage(dessert);
      desserts.push(this.createForm.createOrderForm(dess));
    }

    for (const pizza of storagePizzas) {
      const pizz = this.pizzasData.createOrderPizzasSessionStorage(pizza);
      pizzas.push(this.createForm.createOrderForm(pizz));
    }

    // Sort form array to avoid duplicate
    for (let i = 0; i < beverages.value.length; i ++) {
      for (let j = i + 1 ; j < beverages.value.length; j ++ ) {
        if (beverages.value[i].bevName === beverages.value[j].bevName) {
          this.createForm.sortOrderForm(beverages, i, j);
        }
      }
    }

    for (let i = 0; i < desserts.value.length; i ++) {
      for (let j = i + 1 ; j < desserts.value.length; j ++ ) {
        if (desserts.value[i].dessName === desserts.value[j].dessName) {
          this.createForm.sortOrderForm(desserts, i, j);
        }
      }
    }

    for (let i = 0; i < pizzas.value.length; i ++) {
      for (let j = i + 1 ; j < pizzas.value.length; j ++ ) {
        if (pizzas.value[i].dessName === pizzas.value[j].dessName) {
          this.createForm.sortOrderForm(pizzas, i, j);
        }
      }
    }

    this.totalBasket();

    // creation of formArray pizzas
    this.pizzasData.getUserPizzas.subscribe((pizzasChoice: any) => {
      const pizza = this.finalOrderForm.get('pizza') as FormArray;
      pizza.push(this.createForm.createOrderForm(pizzasChoice));

      for (let i = 0; i < pizza.value.length; i ++) {
        for (let j = i + 1 ; j < pizza.value.length; j ++ ) {
          if (pizza.value[i].pizzasName === pizza.value[j].pizzasName) {
            this.createForm.sortOrderForm(pizza, i, j);
          }
        }
      }
      this.sessionStorage.saveToSessionStorage(this.finalOrderForm.value.pizza);
      this.totalBasket();
    });

    // Creation of FormArray beverages
    this.beverageData.getUserBeverages.subscribe((beveragesChoice: OrderBeverage) => {
      const beverage = this.finalOrderForm.get('beverage') as FormArray;
      beverage.push(this.createForm.createOrderForm(beveragesChoice));

      for (let i = 0; i < beverage.value.length; i ++) {
        for (let j = i + 1 ; j < beverage.value.length; j ++ ) {
          if (beverage.value[i].bevName === beverage.value[j].bevName) {
            this.createForm.sortOrderForm(beverage, i, j);
          }
        }
      }
      this.sessionStorage.saveToSessionStorage(this.finalOrderForm.value.beverage);
      this.totalBasket();
    });
    // Creation of FormArray desserts
    this.dessertData.getUserDesserts.subscribe((dessertsChoice: OrderDessert) => {
      const dessert = this.finalOrderForm.get('dessert') as FormArray;
      dessert.push(this.createForm.createOrderForm(dessertsChoice));

      for (let i = 0; i < dessert.value.length; i ++) {
        for (let j = i + 1 ; j < dessert.value.length; j ++ ) {
          if (dessert.value[i].dessName === dessert.value[j].dessName) {
            this.createForm.sortOrderForm(dessert, i, j);
          }
        }
      }
      this.sessionStorage.saveToSessionStorage(this.finalOrderForm.value.dessert);
      this.totalBasket();
    });

    // Creation of FormArray salads
    this.saladsData.getSalads.subscribe((userSaladsChoice: OrderSalads) => {
      const salad = this.finalOrderForm.get('salad') as FormArray;
      salad.push(this.createForm.createOrderForm(userSaladsChoice));
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

  get salad(): FormArray {
    return this.finalOrderForm.get('salad') as FormArray;
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
  quantitySelect(operator: string, index: number, quantity: number, ingredient: string) {
    const check = Object.getOwnPropertyNames(ingredient);

    if (check[0] === 'idPizzas') {
      // give value of selectQuantity result to calculate price behind
      quantity =
      this.finalOrderForm.value.pizza[index].pizzasQuantity =
      this.quantityService.selectQuantity(operator, quantity);

      if (operator === '+') {
        this.finalOrderForm.value.pizza[index].pizzasPriceTotal =
        (this.finalOrderForm.value.pizza[index].pizzasPriceTotal / (quantity - 1)) * quantity;

      } else {
        this.finalOrderForm.value.pizza[index].pizzasPriceTotal =
        (this.finalOrderForm.value.pizza[index].pizzasPriceTotal / (quantity + 1)) * quantity;
      }

      const pizza = this.finalOrderForm.get('pizza') as FormArray;

      if (pizza.controls[index].value.pizzasQuantity === 0) {
        pizza.removeAt(index); // remove object from form array when quantity = 0
        this.sessionStorage.clearSessionStorage(this.finalOrderForm.value);
      }

      this.sessionStorage.saveToSessionStorage(this.finalOrderForm.value.pizza);
      this.totalBasket();

    } else if (check[0] === 'idBeverages') {
        quantity =
        this.finalOrderForm.value.beverage[index].bevQuantity =
        this.quantityService.selectQuantity(operator, quantity);

        if (operator === '+') {
          this.finalOrderForm.value.beverage[index].bevPriceTotal =
          (this.finalOrderForm.value.beverage[index].bevPriceTotal / (quantity - 1)) * quantity;

        } else {
          this.finalOrderForm.value.beverage[index].bevPriceTotal =
          (this.finalOrderForm.value.beverage[index].bevPriceTotal / (quantity + 1)) * quantity;
        }

        const beverage = this.finalOrderForm.get('beverage') as FormArray;

        if (beverage.controls[index].value.bevQuantity === 0) {
          beverage.removeAt(index); // remove object from form array when quantity = 0
          this.sessionStorage.clearSessionStorage(this.finalOrderForm.value);
        }

        this.sessionStorage.saveToSessionStorage(this.finalOrderForm.value.beverage);
        this.totalBasket();

    } else if (check[0] === 'idDesserts') {
      quantity =
      this.finalOrderForm.value.dessert[index].dessQuantity =
      this.quantityService.selectQuantity(operator, quantity);

      if (operator === '+') {
        this.finalOrderForm.value.dessert[index].dessPriceTotal =
        (this.finalOrderForm.value.dessert[index].dessPriceTotal / (quantity - 1)) * quantity;

      } else {
        this.finalOrderForm.value.dessert[index].dessPriceTotal =
        (this.finalOrderForm.value.dessert[index].dessPriceTotal / (quantity + 1)) * quantity;
      }

      const dessert = this.finalOrderForm.get('dessert') as FormArray;

      if (dessert.controls[index].value.dessQuantity === 0) {
        dessert.removeAt(index); // remove object from form array when quantity = 0
        this.sessionStorage.clearSessionStorage(this.finalOrderForm.value);
      }
      this.sessionStorage.saveToSessionStorage(this.finalOrderForm.value.dessert);
      this.totalBasket();

    } else if (check[0] === 'multiBases' ) {
      quantity =
      this.finalOrderForm.value.salad[index].saladsComposedQuantity =
      this.quantityService.selectQuantity(operator, quantity);

      if (operator === '+') {
        this.finalOrderForm.value.salad[index].saladsComposedTotalPrice =
        (this.finalOrderForm.value.salad[index].saladsComposedTotalPrice / (quantity - 1)) * quantity;

      } else {
        this.finalOrderForm.value.salad[index].saladsComposedTotalPrice =
        (this.finalOrderForm.value.salad[index].saladsComposedTotalPrice / (quantity + 1)) * quantity;
      }

      const salad = this.finalOrderForm.get('salad') as FormArray;

      if (salad.controls[index].value.saladsComposedQuantity === 0) {
        salad.removeAt(index); // remove object from form array when quantity = 0
      }
      this.totalBasket();
    }
    this.total < 15 ? this.enableSubmit = false : this.enableSubmit = true; // Disable submit button
  }

  resetBasket() {
    const pizza = this.finalOrderForm.get('pizza') as FormArray;
    const salad = this.finalOrderForm.get('salad') as FormArray;
    const beverage = this.finalOrderForm.get('beverage') as FormArray;
    const dessert = this.finalOrderForm.get('dessert') as FormArray;

    // Reset all formArray
    while (pizza.length > 0) {
      pizza.removeAt(0);
    }

    while (salad.length > 0) {
      salad.removeAt(0);
    }

    while (beverage.length > 0) {
      beverage.removeAt(0);
    }

    while (dessert.length > 0) {
      dessert.removeAt(0);
    }

    this.sessionStorage.clearSessionStorage(this.finalOrderForm.value.beverage);
    this.sessionStorage.clearSessionStorage(this.finalOrderForm.value.dessert);
    this.sessionStorage.clearSessionStorage(this.finalOrderForm.value.pizza);
    this.totalBasket();
  }

  totalBasket() {
    this.totalArray = [];
    this.total = 0;

    const reducer = (accumulator, currentValue) => accumulator + currentValue; // Method to calculate max of an array

    // Update array of total price with all values from finalOrderForm
    for (const iterator of this.pizza.value) {
      this.totalArray.push(iterator.pizzasPriceTotal);
    }

    for (const iterator of this.beverage.value) {
      this.totalArray.push(iterator.bevPriceTotal);
    }

    for (const iterator of this.dessert.value) {
      this.totalArray.push(iterator.dessPriceTotal);
    }

    for (const iterator of this.salad.value) {
      this.totalArray.push(iterator.saladsComposedTotalPrice);
    }

    this.totalArray.length === 0 ? this.total = 0 : this.total = this.totalArray.reduce(reducer); // Total price
    this.total < 15 ? this.enableSubmit = false : this.enableSubmit = true; // If total price < 15, disable submit button
  }
}
