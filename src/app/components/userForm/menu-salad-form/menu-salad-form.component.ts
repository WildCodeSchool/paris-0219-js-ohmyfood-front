import { Component, OnInit, Input } from '@angular/core';
import { MenuPricesDataService } from 'src/app/services/menu-prices-data.service';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CreateFormService } from 'src/app/services/create-form.service';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';
import { OrderSalads } from 'src/app/class/order-salads';
import { checkBevAndDess } from 'src/app/validators/checkBevAndDess';
import { DatePipe } from '@angular/common';
import { deliveryIntervalTime } from 'src/app/validators/deliveryTimeValidators';
import { SaladsBases } from 'src/app/class/order-saladsBases';
import { SaladsIngredients } from 'src/app/class/order-saladsIngredients';
import { SaladsToppings } from 'src/app/class/order-saladsToppings';
import { SaladsSauces } from 'src/app/class/order-saladsSauces';
import { checkSaladInMenu } from 'src/app/validators/checkSaladInMenu';

@Component({
  selector: 'app-menu-salad-form',
  templateUrl: './menu-salad-form.component.html',
  styleUrls: ['./menu-salad-form.component.scss'],
  providers: [DatePipe]
})
export class MenuSaladFormComponent implements OnInit {

  saladMenuForm: FormGroup;

  // To know if user pick beer
  beerSelected = false;

  // To reset beer boolean when user delete beverages
  resetBevButton = false;

  // To get menu price from database
  priceMenu: any[];

  date: Date = new Date();

  controlDate: string; // To convert date in format wanted

  // To know if menu salad is clicked and transfert information to saladFormComponent
  // Get this information to menuPageComponent
  @Input()
  isMenu: boolean;

  constructor(
    private menuPrices: MenuPricesDataService,
    private saladData: SaladsDatasService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private formBuilder: FormBuilder,
    private createFormService: CreateFormService,
    private datePipe: DatePipe,
  ) {
      this.controlDate = this.datePipe.transform(this.date, 'EEEE H:mm:ss');
    }

  ngOnInit() {
    // Initialize form group
    this.initSaladMenuForm();

    this.saladData.getSaladsForMenu.subscribe((saladComposed: OrderSalads) => {
      // Get good value in form group according to user choice, if he choose a sauce or not
      if (saladComposed.orderSaladsSauces === undefined) {
        this.saladMenuForm.controls.salad.setValue({
          orderSaladsBases: saladComposed.orderSaladsBases,
          orderSaladsIngredients: saladComposed.orderSaladsIngredients,
          orderSaladsQuantity: saladComposed.orderSaladsQuantity,
          orderSaladsToppings: saladComposed.orderSaladsToppings,
          orderSaladsSauces: 'Pas de sauce séléctionnée',
          orderSaladsPriceTotal: saladComposed.orderSaladsPriceTotal.toFixed(2)
          }
        );

      } else {
        this.saladMenuForm.controls.salad.patchValue(
          saladComposed
        );
      }

      // Get finalMenuPrice according to user choice
      const bevPristine = this.saladMenuForm.controls.beverage.pristine;
      const dessPristine = this.saladMenuForm.controls.dessert.pristine;

      // If user choose beverage or dessert, total menu price = 1.50€ + salad composed price
      if (!bevPristine && dessPristine || bevPristine && !dessPristine) {
        this.saladMenuForm.controls.saladMenuPriceTotal.patchValue(
          (this.priceMenu[0].menuSaladPriceOr + +saladComposed.orderSaladsPriceTotal).toFixed(2)
        );

        // If user choose beverage and dessert, total menu price = 3€ + salad composed price
      } else if (!bevPristine && !dessPristine) {
          this.saladMenuForm.controls.saladMenuPriceTotal.patchValue(
            (this.priceMenu[0].menuSaladPriceAnd + +saladComposed.orderSaladsPriceTotal).toFixed(2)
          );

          // If user didn't pick beverage or dessert, total menu price = salad composed price
      } else {
        this.saladMenuForm.controls.saladMenuPriceTotal.patchValue(
          saladComposed.orderSaladsPriceTotal.toFixed(2)
        );
      }

    });

    // Get menu price
    const menuSubscription = this.menuPrices.getMenuPrices()
    .subscribe((menuPrice: any) => {
      this.priceMenu = menuPrice;
      menuSubscription.unsubscribe();
    });

    // get beverage data
    const bevSubscription = this.beverageData.getBeveragesForMenu()
    .subscribe((beverages: any) => {

      const beverage = this.saladMenuForm.get('beverage') as FormArray;

      for (const bev in beverages) {
        if (beverages.hasOwnProperty(bev)) {
          beverage.push(this.createFormService.createForm(beverages[bev]));
        }
      }
      bevSubscription.unsubscribe();
    });

    const dessSubscription = this.dessertData.getDessertsForMenu()
    .subscribe((desserts: any) => {

      const dessert = this.saladMenuForm.get('dessert') as FormArray;

      for (const dess in desserts) {
        if (desserts.hasOwnProperty(dess)) {
          dessert.push(this.createFormService.createForm(desserts[dess]));
        }
      }
      dessSubscription.unsubscribe();
    });
  }

  initSaladMenuForm() {
    this.saladMenuForm = this.formBuilder.group({
      salad: [
        {
          orderSaladsBases: SaladsBases,
          orderSaladsIngredients: SaladsIngredients,
          orderSaladsQuantity: Number,
          orderSaladsToppings: SaladsToppings,
          orderSaladsSauces: SaladsSauces,
          orderSaladsPriceTotal: 0
        }, checkSaladInMenu() // Validator to check if user create a salad
      ],
      beverage: this.formBuilder.array([]),
      dessert: this.formBuilder.array([]),
      saladMenuPrice: 0,
      saladMenuPriceTotal: 0
    },
    {
      validator: [
        checkBevAndDess('beverage', 'dessert'), // Validator quantity
        deliveryIntervalTime(this.controlDate, true) // Validator time
      ]
    });
  }

  get beverage(): FormArray {
    return this.saladMenuForm.get('beverage') as FormArray;
  }

  get dessert(): FormArray {
    return this.saladMenuForm.get('dessert') as FormArray;
  }

  onSubmit() {
    const saladMenuChoice = this.saladMenuForm.value;

    this.menuPrices.createOrderMenu(saladMenuChoice);

    this.saladMenuForm.reset(this.saladMenuForm.value);

    this.beerSelected = false;
  }

  getUserChoice(index: number, choice: object) {
    // To check wich object we have to change in method
    const check = Object.getOwnPropertyNames(choice);

    // To know if user pick beer
    if (check[0] === 'idBeverages') {
      if (choice[`bevName`] === 'Bière' && !this.resetBevButton) {
        this.beerSelected = true;

      } else {
        this.beerSelected = false;
      }
    }

    // To check if user select beverage and/or dessert and patch value menu price
    const bevPristine = this.saladMenuForm.controls.beverage.pristine;
    const dessPristine = this.saladMenuForm.controls.dessert.pristine;

    if (!bevPristine && dessPristine || bevPristine && !dessPristine) {
      if (!this.beerSelected) {
        this.saladMenuForm.controls.saladMenuPrice.patchValue(
          this.priceMenu[0].menuSaladPriceOr.toFixed(2)
        );

        // patch value of total price menu
        this.saladMenuForm.controls.saladMenuPriceTotal.patchValue(
          (this.priceMenu[0].menuSaladPriceOr + +this.saladMenuForm.value.salad.orderSaladsPriceTotal).toFixed(2)
        );

      } else if (this.beerSelected) {

        this.saladMenuForm.controls.saladMenuPrice.patchValue(
          (this.priceMenu[0].menuSaladPriceOr + 1).toFixed(2)
        );

        // patch value of total price menu
        this.saladMenuForm.controls.saladMenuPriceTotal.patchValue(
          (this.priceMenu[0].menuSaladPriceOr + 1 + +this.saladMenuForm.value.salad.orderSaladsPriceTotal).toFixed(2)
        );
      }

    } else if (!bevPristine && !dessPristine) {
      if (!this.beerSelected) {
        this.saladMenuForm.controls.saladMenuPrice.patchValue(
          this.priceMenu[0].menuSaladPriceAnd.toFixed(2)
        );

        // patch value of total price menu
        this.saladMenuForm.controls.saladMenuPriceTotal.patchValue(
          (this.priceMenu[0].menuSaladPriceAnd + +this.saladMenuForm.value.salad.orderSaladsPriceTotal).toFixed(2)
        );
      } else if (this.beerSelected) {
        this.saladMenuForm.controls.saladMenuPrice.patchValue(
          (this.priceMenu[0].menuSaladPriceAnd + 1).toFixed(2)
        );

        // patch value of total price menu
        this.saladMenuForm.controls.saladMenuPriceTotal.patchValue(
          (this.priceMenu[0].menuSaladPriceAnd + 1 + +this.saladMenuForm.value.salad.orderSaladsPriceTotal).toFixed(2)
        );
      }

    } else {
        this.saladMenuForm.controls.saladMenuPrice.patchValue(
          0
        );

        // patch value of total price menu
        this.saladMenuForm.controls.saladMenuPriceTotal.patchValue(
          this.saladMenuForm.value.salad.orderSaladsPriceTotal
        );
    }
    this.resetBevButton = false;
    this.saladMenuForm = this.menuPrices.getRadioButton(this.saladMenuForm, index, choice, check, 'menuSalad');
  }

  resetBevOrDess(userChoice: string) {
    if (userChoice === 'beverage') {
      this.saladMenuForm.controls.beverage[`controls`].map(
        (bev: any) => {
          this.beerSelected = false;
          this.resetBevButton = true;
          bev.controls.bevQuantity.reset(0);
        });

    } else if (userChoice === 'dessert') {
      this.saladMenuForm.controls.dessert[`controls`].map(
        (dess: any) => dess.controls.dessQuantity.reset(0)
      );
    }
  }

}
