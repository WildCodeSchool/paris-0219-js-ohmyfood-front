import { Component, OnInit } from '@angular/core';
import { MenuPricesDataService } from 'src/app/services/menu-prices-data.service';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CreateFormService } from 'src/app/services/create-form.service';

@Component({
  selector: 'app-menu-salad-form',
  templateUrl: './menu-salad-form.component.html',
  styleUrls: ['./menu-salad-form.component.scss']
})
export class MenuSaladFormComponent implements OnInit {

  saladMenuForm: FormGroup;

  constructor(
    private menuPrices: MenuPricesDataService,
    private beverageData: BeveragesDataService,
    private dessertData: DessertsDataService,
    private formBuilder: FormBuilder,
    private createFormService: CreateFormService
  ) { }

  ngOnInit() {
    // Initialize form group
    this.saladMenuForm = this.formBuilder.group({
      salad: '',
      beverage: this.formBuilder.array([]),
      dessert: this.formBuilder.array([]),
      saladMenuPrice: Number
    });

    // Get menu price
    const menuSubscription = this.menuPrices.getMenuPrices()
    .subscribe((menuPrice: any) => {
      console.log(menuPrice);
    });

    // get beverage data
    const bevSubscription = this.beverageData.getBeverages()
    .subscribe((beverages: any) => {

      const beverage = this.saladMenuForm.get('beverage') as FormArray;

      for (const bev in beverages) {
        if (beverages.hasOwnProperty(bev)) {
          beverage.push(this.createFormService.createForm(beverages[bev]));
        }
      }
      bevSubscription.unsubscribe();
    });

    const dessSubscription = this.dessertData.getDesserts()
    .subscribe((desserts: any) => {

      const dessert = this.saladMenuForm.get('dessert') as FormArray;

      for (const dess in desserts) {
        if (desserts.hasOwnProperty(dess)) {
          dessert.push(this.createFormService.createForm(desserts[dess]));
        }
      }
      dessSubscription.unsubscribe();
    });
    console.log(this.saladMenuForm);
  }

}
