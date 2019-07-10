import { Component, OnInit, Input } from '@angular/core';
import { MenuPricesDataService } from 'src/app/services/menu-prices-data.service';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CreateFormService } from 'src/app/services/create-form.service';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';
import { OrderSalads } from 'src/app/class/order-salads';

@Component({
  selector: 'app-menu-salad-form',
  templateUrl: './menu-salad-form.component.html',
  styleUrls: ['./menu-salad-form.component.scss']
})
export class MenuSaladFormComponent implements OnInit {

  saladMenuForm: FormGroup;

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
    private createFormService: CreateFormService
  ) { }

  ngOnInit() {
    // Initialize form group
    this.saladMenuForm = this.formBuilder.group({
      salad: {},
      beverage: this.formBuilder.array([]),
      dessert: this.formBuilder.array([]),
      saladMenuPrice: Number
    });

    const saladSubscription = this.saladData.getSaladsForMenu.subscribe((saladComposed: OrderSalads) => {
      this.saladMenuForm.controls.salad.patchValue({
        saladComposed
      });
      console.log(this.saladMenuForm);
      saladSubscription.unsubscribe();
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
  }

}
