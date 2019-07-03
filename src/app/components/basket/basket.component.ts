import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { OrderPizzas } from 'src/app/class/order-pizzas';
import { FormBuilder, FormArray } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { CreateFormBasketService } from 'src/app/services/create-form-basket.service';
import { OrderBeverage } from 'src/app/class/order-beverage';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { OrderDessert } from 'src/app/class/order-dessert';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { OrderSalads } from 'src/app/class/order-salads';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  isToggleBasket: boolean;

  enableSubmit: boolean;

  totalArray: Array<number> = []; // Use to calculate total price

  initPrice: boolean;

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
    private saladsData: SaladsDatasService
    ) { }

  ngOnInit() {
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
      this.enableSubmit = true;
      this.totalBasket();
    });

    // Creation of FormArray beverages
    this.beverageData.getUserBeverages.subscribe((beveragesChoice: any) => {

      const beverage = this.finalOrderForm.get('beverage') as FormArray;

      beverage.push(this.createForm.createOrderForm(beveragesChoice));

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
    this.dessertData.getUserDesserts.subscribe((dessertsChoice: any) => {

      const dessert = this.finalOrderForm.get('dessert') as FormArray;

      dessert.push(this.createForm.createOrderForm(dessertsChoice));

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

    // Creation of FormArray salads
    this.saladsData.getSalads.subscribe((userSaladsChoice: any) => {
      const salad = this.finalOrderForm.get('salad') as FormArray;
      salad.push(this.createForm.createOrderForm(userSaladsChoice));
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
    console.log(finalOrder);

    this.resetBasket();
  }

  // method to update basket quantity and service's userChoice to have good values in basketComponent
  quantitySelect(operator: string, index: number, quantity: number, ingredient: string) {
    const check = Object.getOwnPropertyNames(ingredient);

    if (check[0] === 'idPizzas') {
      // give value of selectQuantity result to calculate price behind
      quantity =
      this.finalOrderForm.value.pizza[index].pizzasQuantity = this.quantityService.selectQuantity(operator, quantity);

      if (operator === '+') {
        this.finalOrderForm.value.pizza[index].pizzasPriceTotal = (this.finalOrderForm.value.pizza[index].pizzasPriceTotal / (quantity - 1))
        * quantity;

      } else {
        this.finalOrderForm.value.pizza[index].pizzasPriceTotal =
        (this.finalOrderForm.value.pizza[index].pizzasPriceTotal / (quantity + 1)) * quantity;
      }

      const pizza = this.finalOrderForm.get('pizza') as FormArray;

      if (pizza.controls[index].value.pizzasQuantity === 0) {
        pizza.removeAt(index); // remove object from form array when quantity = 0
      }

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
        }

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
