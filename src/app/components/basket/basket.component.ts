import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { CreateFormBasketService } from 'src/app/services/create-form-basket.service';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';
import { BasketlocalStorageService } from 'src/app/services/basket-session-storage.service';
import { OrderBeverage } from 'src/app/class/order-beverage';
import { OrderDessert } from 'src/app/class/order-dessert';
import { OrderSalads } from 'src/app/class/order-salads';
import { Router } from '@angular/router';
import { FinalOrderService } from 'src/app/services/final-order.service';
import { MenuPricesDataService } from 'src/app/services/menu-prices-data.service';
import { MenuPizza } from 'src/app/class/menu-pizza';
import { MenuSalad } from 'src/app/class/menu-salad';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [DatePipe]
})
export class BasketComponent implements OnInit {

  pizzasList = [];

  ohMyMardiPizzPrice: object;

  date: Date = new Date();

  controlDate: string;

  today: string;

  isToggleBasket: boolean; // To toggle basket

  totalArray: Array<number> = []; // Use to calculate total price

  total: number; // final result

  finalOrderForm = this.formBuilder.group({
    pizza: this.formBuilder.array([]),
    salad: this.formBuilder.array([]),
    beverage: this.formBuilder.array([]),
    dessert: this.formBuilder.array([]),
    menuPizza: this.formBuilder.array([]),
    menuSalad: this.formBuilder.array([])
  });

  constructor(
    private pizzasData: PizzasDataService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private formBuilder: FormBuilder,
    private quantityService: QuantitySelectService,
    private createForm: CreateFormBasketService,
    private saladsData: SaladsDatasService,
    private localStorage: BasketlocalStorageService,
    private router: Router,
    private finalOrder: FinalOrderService,
    private menuPrice: MenuPricesDataService,
    private datePipe: DatePipe
    ) {this.controlDate = this.datePipe.transform(this.date, 'EEEE H:mm:ss'); }

  ngOnInit() {

    // Get item from local storage to update basket
    const storageBeverages = localStorage.getItem('beverages') ? // If there is key in session storage, get it in variable
    JSON.parse(localStorage.getItem('beverages')) : [];

    const storageDesserts = localStorage.getItem('desserts') ?
    JSON.parse(localStorage.getItem('desserts')) : [];

    const storagePizzas = localStorage.getItem('pizzas') ?
    JSON.parse(localStorage.getItem('pizzas')) : [];

    const storageSalads = localStorage.getItem('salads') ?
    JSON.parse(localStorage.getItem('salads')) : [];

    const storageMenuPizza = localStorage.getItem('menuPizza') ?
    JSON.parse(localStorage.getItem('menuPizza')) : [];

    const storageMenuSalad = localStorage.getItem('menuSalad') ?
    JSON.parse(localStorage.getItem('menuSalad')) : [];

    // Create Form group to push it in formArray of final order to update basket with good value
    const beverage = this.finalOrderForm.get('beverage') as FormArray;
    const dessert = this.finalOrderForm.get('dessert') as FormArray;
    const pizza = this.finalOrderForm.get('pizza') as FormArray;
    const salad = this.finalOrderForm.get('salad') as FormArray;
    const menuPizza = this.finalOrderForm.get('menuPizza') as FormArray;
    const menuSalad = this.finalOrderForm.get('menuSalad') as FormArray;

    for (const pizzas of storagePizzas) {
      const pizz = this.pizzasData.createOrderPizzaslocalStorage(pizzas);
      pizza.push(this.createForm.createOrderForm(pizz));
      this.pizzasList.push(pizz);
    }

    for (const saladComposed of storageSalads) {
      const salads = this.saladsData.createOrderSaladslocalStorage(saladComposed);
      salad.push(this.createForm.createOrderForm(salads));
    }

    for (const beverages of storageBeverages) {
      const bev = this.beverageData.createOrderBeveragelocalStorage(beverages); // Create orderBeverage
      beverage.push(this.createForm.createOrderForm(bev)); // Create formGroup with object and push it in formArray
    }

    for (const desserts of storageDesserts) {
      const dess = this.dessertData.createOrderDessertslocalStorage(desserts);
      dessert.push(this.createForm.createOrderForm(dess));
    }

    for (const menuPizzas of storageMenuPizza) {
      const menuPizz = this.menuPrice.createOrderMenulocalStorage(menuPizzas);
      menuPizza.push(this.createForm.createOrderForm(menuPizz));
    }

    for (const menuSalads of storageMenuSalad) {
      const menuSaladComposed = this.menuPrice.createOrderMenulocalStorage(menuSalads);
      menuSalad.push(this.createForm.createOrderForm(menuSaladComposed));
    }

    // Sort form array to avoid duplicate
    for (let i = 0; i < pizza.value.length; i ++) {
      for (let j = i + 1 ; j < pizza.value.length; j ++ ) {
        if (pizza.value[i].pizzName === pizza.value[j].pizzName) {
        this.createForm.sortOrderForm(pizza, i, j);
        }
      }
    }

    for (let i = 0; i < beverage.value.length; i ++) {
      for (let j = i + 1 ; j < beverage.value.length; j ++ ) {
        if (beverage.value[i].bevName === beverage.value[j].bevName) {
          this.createForm.sortOrderForm(beverage, i, j);
        }
      }
    }

    for (let i = 0; i < dessert.value.length; i ++) {
      for (let j = i + 1 ; j < dessert.value.length; j ++ ) {
        if (dessert.value[i].dessName === dessert.value[j].dessName) {
          this.createForm.sortOrderForm(dessert, i, j);
        }
      }
    }
    this.totalBasket();

    // creation of formArray pizzas
    this.pizzasData.getUserPizzas.subscribe((pizzasChoice: any) => {
      pizza.push(this.createForm.createOrderForm(pizzasChoice));

      this.pizzasList = pizzasChoice;
      console.log(this.pizzasList)

      for (let i = 0; i < pizza.value.length; i ++) {
        for (let j = i + 1 ; j < pizza.value.length; j ++ ) {
          if (pizza.value[i].pizzName === pizza.value[j].pizzName) {
            this.createForm.sortOrderForm(pizza, i, j);
          }
        }
      }
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.pizza);
      this.totalBasket();
    });

    // Creation of FormArray beverages
    this.beverageData.getUserBeverages.subscribe((beveragesChoice: OrderBeverage) => {
      beverage.push(this.createForm.createOrderForm(beveragesChoice));

      for (let i = 0; i < beverage.value.length; i ++) {
        for (let j = i + 1 ; j < beverage.value.length; j ++ ) {
          if (beverage.value[i].bevName === beverage.value[j].bevName) {
            this.createForm.sortOrderForm(beverage, i, j);
          }
        }
      }
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.beverage);
      this.totalBasket();
    });
    // Creation of FormArray desserts
    this.dessertData.getUserDesserts.subscribe((dessertsChoice: OrderDessert) => {
      dessert.push(this.createForm.createOrderForm(dessertsChoice));

      for (let i = 0; i < dessert.value.length; i ++) {
        for (let j = i + 1 ; j < dessert.value.length; j ++ ) {
          if (dessert.value[i].dessName === dessert.value[j].dessName) {
            this.createForm.sortOrderForm(dessert, i, j);
          }
        }
      }
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.dessert);
      this.totalBasket();
    });

    // Creation of FormArray salads
    this.saladsData.getSalads.subscribe((userSaladsChoice: OrderSalads) => {
      salad.push(this.createForm.createOrderForm(userSaladsChoice));
      this.totalBasket();
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.salad);
    });

    // Creation of FormArray menuPizza
    this.menuPrice.getMenuPizza.subscribe((userMenuPizzaChoice: MenuPizza) => {
      menuPizza.push(this.createForm.createOrderForm(userMenuPizzaChoice));
      this.totalBasket();
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.menuPizza);
    });

    // Creation of formArray menuSalad
    this.menuPrice.getMenuSalad.subscribe((userMenuSaladChoice: MenuSalad) => {
      menuSalad.push(this.createForm.createOrderForm(userMenuSaladChoice));
      this.totalBasket();
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.menuSalad);
    });

    // Get price of myMardi
    const ohMyMardiSubscription = this.pizzasData.getOhMyMardiPrice()
    .subscribe(ohMyMardiPrice => {

      this.ohMyMardiPizzPrice = ohMyMardiPrice;
      this.today = this.controlDate.split(' ')[0]; // Control day of order

      ohMyMardiSubscription.unsubscribe();
    });

    this.pizzasData.transmitOrderStatus.subscribe((orderStatus: string) => {
      if (orderStatus === 'toTakeAway' && this.today === 'Tuesday') {
        this.ohMyMardiPrice();
      } else {
        this.patchPizzasPrice();
      }
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

  get menuPizza(): FormArray {
    return this.finalOrderForm.get('menuPizza') as FormArray;
  }

  get menuSalad(): FormArray {
    return this.finalOrderForm.get('menuSalad') as FormArray;
  }

  onSubmit() {
    const userFinalOrder = this.finalOrderForm.value;

    this.finalOrder.transfertFinalOrder(userFinalOrder);
    this.finalOrderForm.reset();
    this.router.navigate(['detailOrderPage']);
    this.resetBasket();
  }

  // method to update basket quantity and service's userChoice to have good values in basketComponent
  quantitySelect(operator: string, index: number, quantity: number, ingredient: string) {
    const check = Object.getOwnPropertyNames(ingredient);

    if (check[0] === 'idPizzas') {
      // give value of selectQuantity result to calculate price behind
      quantity =
      this.finalOrderForm.value.pizza[index].pizzQuantity =
      this.quantityService.selectQuantity(operator, quantity);

      if (operator === '+') {
        this.finalOrderForm.value.pizza[index].pizzPriceTotal =
        (this.finalOrderForm.value.pizza[index].pizzPriceTotal / (quantity - 1)) * quantity;

      } else {
        this.finalOrderForm.value.pizza[index].pizzPriceTotal =
        (this.finalOrderForm.value.pizza[index].pizzPriceTotal / (quantity + 1)) * quantity;
      }

      const pizza = this.finalOrderForm.get('pizza') as FormArray;

      if (pizza.controls[index].value.pizzQuantity === 0) {
        pizza.removeAt(index); // remove object from form array when quantity = 0
        this.localStorage.clearlocalStorage(this.finalOrderForm.value.pizza, 'pizza');
      }

      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.pizza);
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
          this.localStorage.clearlocalStorage(this.finalOrderForm.value.beverage, 'beverage');
        }

        this.localStorage.saveTolocalStorage(this.finalOrderForm.value.beverage);
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
        this.localStorage.clearlocalStorage(this.finalOrderForm.value.dessert, 'dessert');
      }
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.dessert);
      this.totalBasket();

    } else if (check[0] === 'multiBases' ) {
      quantity =
      this.finalOrderForm.value.salad[index].saladsComposedQuantity =
      this.quantityService.selectQuantity(operator, quantity);

      if (operator === '+') {
        this.finalOrderForm.value.salad[index].saladsComposedPriceTotal =
        (this.finalOrderForm.value.salad[index].saladsComposedPriceTotal / (quantity - 1)) * quantity;

      } else {
        this.finalOrderForm.value.salad[index].saladsComposedPriceTotal =
        (this.finalOrderForm.value.salad[index].saladsComposedPriceTotal / (quantity + 1)) * quantity;
      }

      const salad = this.finalOrderForm.get('salad') as FormArray;

      if (salad.controls[index].value.saladsComposedQuantity === 0) {
        salad.removeAt(index); // remove object from form array when quantity = 0
        this.localStorage.clearlocalStorage(this.finalOrderForm.value.salad, 'salad');
      }
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.salad);
      this.totalBasket();

    } else if (check[0] === 'pizza') {
      quantity =
      this.finalOrderForm.value.menuPizza[index].menuPizzQuantity =
      this.quantityService.selectQuantity(operator, quantity);

      if (operator === '+') {
        this.finalOrderForm.value.menuPizza[index].menuPizzPriceTotal =
        (this.finalOrderForm.value.menuPizza[index].menuPizzPriceTotal / (quantity - 1)) * quantity;

      } else {
        this.finalOrderForm.value.menuPizza[index].menuPizzPriceTotal =
        (this.finalOrderForm.value.menuPizza[index].menuPizzPriceTotal / (quantity + 1)) * quantity;
      }

      const menuPizza = this.finalOrderForm.get('menuPizza') as FormArray;

      if (menuPizza.controls[index].value.menuPizzQuantity === 0) {
        menuPizza.removeAt(index); // remove object from form array when quantity = 0
        this.localStorage.clearlocalStorage(this.finalOrderForm.value.menuPizza, 'menuPizza');
      }
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.menuPizza);
      this.totalBasket();

    } else if (check[0] === 'salad') {
      quantity =
      this.finalOrderForm.value.menuSalad[index].menuSaladQuantity =
      this.quantityService.selectQuantity(operator, quantity);

      if (operator === '+') {
        this.finalOrderForm.value.menuSalad[index].menuSaladPriceTotal =
        (this.finalOrderForm.value.menuSalad[index].menuSaladPriceTotal / (quantity - 1)) * quantity;

      } else {
        this.finalOrderForm.value.menuSalad[index].menuSaladPriceTotal =
        (this.finalOrderForm.value.menuSalad[index].menuSaladPriceTotal / (quantity + 1)) * quantity;
      }

      const menuSalad = this.finalOrderForm.get('menuSalad') as FormArray;

      if (menuSalad.controls[index].value.menuSaladQuantity === 0) {
        menuSalad.removeAt(index); // remove object from form array when quantity = 0
        this.localStorage.clearlocalStorage(this.finalOrderForm.value.menuSalad, 'menuSalad');
      }
      this.localStorage.saveTolocalStorage(this.finalOrderForm.value.menuSalad);
      this.totalBasket();
    }
  }

  resetBasket() {
    const pizza = this.finalOrderForm.get('pizza') as FormArray;
    const salad = this.finalOrderForm.get('salad') as FormArray;
    const beverage = this.finalOrderForm.get('beverage') as FormArray;
    const dessert = this.finalOrderForm.get('dessert') as FormArray;
    const menuPizza = this.finalOrderForm.get('menuPizza') as FormArray;
    const menuSalad = this.finalOrderForm.get('menuSalad') as FormArray;

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

    while (menuPizza.length > 0) {
      menuPizza.removeAt(0);
    }

    while (menuSalad.length > 0) {
      menuSalad.removeAt(0);
    }

    this.localStorage.clearlocalStorage(this.finalOrderForm.value.beverage, 'reset');
    this.localStorage.clearlocalStorage(this.finalOrderForm.value.dessert, 'reset');
    this.localStorage.clearlocalStorage(this.finalOrderForm.value.pizza, 'reset');
    this.localStorage.clearlocalStorage(this.finalOrderForm.value.salad, 'reset');
    this.localStorage.clearlocalStorage(this.finalOrderForm.value.menuPizza, 'reset');
    this.localStorage.clearlocalStorage(this.finalOrderForm.value.menuSalad, 'reset');
    this.totalBasket();
  }

  totalBasket() {
    this.totalArray = [];
    this.total = 0;


    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue; // Method to calculate max of an array

    // Update array of total price with all values from finalOrderForm
    for (const pizza of this.pizza.value) {
      this.totalArray.push(+pizza.pizzPriceTotal);
    }

    for (const beverage of this.beverage.value) {
      this.totalArray.push(+beverage.bevPriceTotal);
    }

    for (const dessert of this.dessert.value) {
      this.totalArray.push(+dessert.dessPriceTotal);
    }

    for (const salad of this.salad.value) {
      this.totalArray.push(+salad.saladsComposedPriceTotal);
    }

    for (const menuPizz of this.menuPizza.value) {
      this.totalArray.push(+menuPizz.menuPizzPriceTotal);
    }

    for (const menuSaladChoice of this.menuSalad.value) {
      this.totalArray.push(+menuSaladChoice.menuSaladPriceTotal);
    }
    this.totalArray.length === 0 ? this.total = 0 : this.total = this.totalArray.reduce(reducer); // Total price
  }

  // If pizzPrice are reduce
  ohMyMardiPrice() {
    for (const pizza of this.finalOrderForm.controls.pizza[`controls`]) {
      pizza.controls.pizzPriceTotal.patchValue(
        this.ohMyMardiPizzPrice[0].pizzPriceReducTTC
      );
    }
  }

  // If there isn't reduc price
  patchPizzasPrice() {
    for (const pizza of this.finalOrderForm.controls.pizza[`controls`]) {
      for (const pizzas in this.pizzasList) {
        if (this.pizzasList.hasOwnProperty(pizzas)) {
          if (pizza.controls.pizzName.value === this.pizzasList[pizzas].pizzName) {
            pizza.controls.pizzPriceTotal.patchValue(
              this.pizzasList[pizzas].pizzPrice
            );
          }
        }
      }
    }
  }

}

