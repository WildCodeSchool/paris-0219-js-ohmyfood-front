import { Component, OnInit } from '@angular/core';
import { MenuPricesDataService } from 'src/app/services/menu-prices-data.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { CreateFormService } from 'src/app/services/create-form.service';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { DessertsDataService } from 'src/app/services/desserts-data.service';

@Component({
  selector: 'app-menu-pizza-form',
  templateUrl: './menu-pizza-form.component.html',
  styleUrls: ['./menu-pizza-form.component.scss']
})
export class MenuPizzaFormComponent implements OnInit {

  constructor(
    private menuPrices: MenuPricesDataService,
    private pizzaData: PizzasDataService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private createFormService: CreateFormService,
    private formBuilder: FormBuilder
    ) { }

    pizzaMenuForm = this.formBuilder.group({
      pizza: this.formBuilder.array([]),
      beverage: this.formBuilder.array([]),
      dessert: this.formBuilder.array([]),
      pizzaMenuPrice: Number
    });


  ngOnInit() {
    const menuSubscription = this.menuPrices.getMenuPrices()
    .subscribe((menuPrice: any) => {
      this.pizzaMenuForm.controls.pizzaMenuPrice.patchValue({
        pizzaMenuPrice: menuPrice[0].menuPizzPrice.toFixed(2)
      });
      menuSubscription.unsubscribe();
    });

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
    console.log(this.pizzaMenuForm);

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
}
