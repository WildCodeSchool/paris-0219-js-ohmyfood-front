import { Component, OnInit } from '@angular/core';
import { MenuPricesDataService } from 'src/app/services/menu-prices-data.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';

@Component({
  selector: 'app-menu-pizza-form',
  templateUrl: './menu-pizza-form.component.html',
  styleUrls: ['./menu-pizza-form.component.scss']
})
export class MenuPizzaFormComponent implements OnInit {

  constructor(
    private menuPrices: MenuPricesDataService,
    private pizzaData: PizzasDataService,
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
        pizzaMenuPrice: menuPrice[0].menuPizzPrice
      });
      menuSubscription.unsubscribe();
    });

    const pizzSubscription = this.pizzaData.getPizzas()
    .subscribe((pizza: any) => {
      console.log(pizza);
    });
  }
}
