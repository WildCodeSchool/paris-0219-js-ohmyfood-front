import { Component, OnInit } from '@angular/core';
import { MenuPricesDataService } from 'src/app/services/menu-prices-data.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { CreateFormService } from 'src/app/services/create-form.service';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { DatePipe } from '@angular/common';
import { deliveryIntervalTime } from '../../../validators/deliveryTimeValidators';
import { quantityMenuPizzaControl } from 'src/app/validators/menuPizzaQuantityValidators';
import { quantityMenuBeverageControl } from 'src/app/validators/menuBeverageQuantityValidators';
import { quantityMenuDessertControl } from '../../../validators/menuDessertQuantityValidators';

@Component({
  selector: 'app-menu-pizza-form',
  templateUrl: './menu-pizza-form.component.html',
  styleUrls: ['./menu-pizza-form.component.scss'],
  providers: [DatePipe]
})
export class MenuPizzaFormComponent implements OnInit {

  date: Date = new Date(); // Date of the day

  controlDate: string; // To convert date in format wanted

  pizzaMenuForm: FormGroup;

  constructor(
    private menuPrices: MenuPricesDataService,
    private pizzaData: PizzasDataService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private createFormService: CreateFormService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
    ) {
        this.controlDate = this.datePipe.transform(this.date, 'H:mm:ss');
      }


  ngOnInit() {
    // Initialize form group
    this.pizzaMenuForm = this.formBuilder.group({
      pizza: this.formBuilder.array([], quantityMenuPizzaControl()),
      beverage: this.formBuilder.array([], quantityMenuBeverageControl()),
      dessert: this.formBuilder.array([], quantityMenuDessertControl()),
      pizzaMenuPrice: Number,
      },
      {
      validators: deliveryIntervalTime(this.controlDate), // Validator time
      }
    );

    // Get Menu Price
    const menuSubscription = this.menuPrices.getMenuPrices()
    .subscribe((menuPrice: any) => {
      this.pizzaMenuForm.controls.pizzaMenuPrice.patchValue({
        pizzaMenuPrice: menuPrice[0].menuPizzPrice.toFixed(2)
      });
      menuSubscription.unsubscribe();
    });

    // Get pizza data and create form group and push it in form Array
    const pizzSubscription = this.pizzaData.getPizzas()
    .subscribe((pizzas: any) => {

      const pizza = this.pizzaMenuForm.get('pizza') as FormArray;

      for (const pizz in pizzas) {
        if (pizzas.hasOwnProperty(pizz)) {
          pizza.push(this.createFormService.createForm(pizzas[pizz]));
        }
      }
      pizzSubscription.unsubscribe();
    });

    // Same thing for beverages
    const bevSubscription = this.beverageData.getBeverages()
    .subscribe((beverages: any) => {

      const beverage = this.pizzaMenuForm.get('beverage') as FormArray;

      for (const bev in beverages) {
        if (beverages.hasOwnProperty(bev)) {
          beverage.push(this.createFormService.createForm(beverages[bev]));
        }
      }
      bevSubscription.unsubscribe();
    });

    // Same thing for desserts
    const dessSubscription = this.dessertData.getDesserts()
    .subscribe((desserts: any) => {
      const dessert = this.pizzaMenuForm.get('dessert') as FormArray;

      for (const dess in desserts) {
        if (desserts.hasOwnProperty(dess)) {
          dessert.push(this.createFormService.createForm(desserts[dess]));
        }
      }
      dessSubscription.unsubscribe();
    });
  }

  get pizza(): FormArray {
    return this.pizzaMenuForm.get('pizza') as FormArray;
  }

  get beverage(): FormArray {
    return this.pizzaMenuForm.get('beverage') as FormArray;
  }

  get dessert(): FormArray {
    return this.pizzaMenuForm.get('dessert') as FormArray;
  }

  onSubmit() {
    const pizzaMenuChoice = this.pizzaMenuForm.value;

    this.menuPrices.createOrderMenu(pizzaMenuChoice);
  }

  getUserChoice(index: number, choice) {

    const check = Object.getOwnPropertyNames(choice);

    if (check[0] === 'idPizzas') {
      const length = this.pizzaMenuForm.controls.pizza[`controls`].length; // To get array length

      for (let i = 0; i < length; i ++) {
        index !== i ?
        this.pizzaMenuForm.controls.pizza[`controls`][i].value.pizzQuantity = 0 :
        this.pizzaMenuForm.controls.pizza[`controls`][i].value.pizzQuantity = 1;
        }

    } else if (check[0] === 'idBeverages') {
        const length = this.pizzaMenuForm.controls.beverage[`controls`].length; // To get array length

        for (let i = 0; i < length; i ++) {
          index !== i ?
          this.pizzaMenuForm.controls.beverage[`controls`][i].value.bevQuantity = 0 :
          this.pizzaMenuForm.controls.beverage[`controls`][i].value.bevQuantity = 1;
          }

    } else if (check[0] === 'idDesserts') {
        const length = this.pizzaMenuForm.controls.dessert[`controls`].length; // To get array length

        for (let i = 0; i < length; i ++) {
          index !== i ?
          this.pizzaMenuForm.controls.dessert[`controls`][i].value.dessQuantity = 0 :
          this.pizzaMenuForm.controls.dessert[`controls`][i].value.dessQuantity = 1;
          }
    }
  }
}
