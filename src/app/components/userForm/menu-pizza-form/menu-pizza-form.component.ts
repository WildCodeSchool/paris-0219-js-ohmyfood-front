import { Component, OnInit } from '@angular/core';
import { MenuPricesDataService } from 'src/app/services/menu-prices-data.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { CreateFormService } from 'src/app/services/create-form.service';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { DatePipe } from '@angular/common';
import { deliveryIntervalTime } from '../../../validators/deliveryTimeValidators';
import { quantityMenuPizzaControl } from 'src/app/validators/quantityMenuPizzaControl';

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

  beerSelected: boolean;

  menusPrice: object;

  constructor(
    private menuPrices: MenuPricesDataService,
    private pizzaData: PizzasDataService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private createFormService: CreateFormService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
    ) {
        this.controlDate = this.datePipe.transform(this.date, 'EEEE H:mm:ss');
      }


  ngOnInit() {
    // Initialize form group
    this.initPizzaMenuForm();

    // Get Menu Price
    const menuSubscription = this.menuPrices.getMenuPrices()
    .subscribe((menuPrice: any) => {
      this.pizzaMenuForm.controls.pizzaMenuPriceTotal.patchValue(
        menuPrice[0].menuPizzPrice.toFixed(2)
      );

      this.menusPrice = menuPrice;
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
    const bevSubscription = this.beverageData.getBeveragesForMenu()
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
          // Delete pizza nutella desserts because it's not in menu
          if (desserts[dess].dessName === 'Pizza Nutella cuite au four') {
            desserts.splice(dess, 1);
          }
          dessert.push(this.createFormService.createForm(desserts[dess]));
        }
      }
      dessSubscription.unsubscribe();
    });
  }

  initPizzaMenuForm() {
    this.pizzaMenuForm = this.formBuilder.group({
      pizza: this.formBuilder.array([]),
      beverage: this.formBuilder.array([]),
      dessert: this.formBuilder.array([]),
      pizzaMenuPriceTotal: Number,
      },
      {
      validators: [
        deliveryIntervalTime(this.controlDate, true), // Validator time
        quantityMenuPizzaControl('pizza', 'beverage', 'dessert') // Validator quantity
        ],
      }
    );
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

  getUserChoice(index: number, choice: object) {
  // To check wich object we have to change in method
  const check = Object.getOwnPropertyNames(choice);

  this.pizzaMenuForm = this.menuPrices.getRadioButton(this.pizzaMenuForm, index, this.menusPrice, check);

  if (check[0] === 'idBeverages' && this.pizzaMenuForm.value.beverage[index].bevName === 'Bière') {
    this.beerSelected = true;
    } else {
      this.beerSelected = false;
    }
  }
}
