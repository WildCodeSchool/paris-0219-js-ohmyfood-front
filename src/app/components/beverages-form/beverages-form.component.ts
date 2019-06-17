import { Component, OnInit } from '@angular/core';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';

@Component({
  selector: 'app-beverages-form',
  templateUrl: './beverages-form.component.html',
  styleUrls: ['./beverages-form.component.scss']
})
export class BeveragesFormComponent implements OnInit {

  // Datas collection from database
  beveragesList: object;

  // Enable submit button
  enableSubmit: boolean;

  // Reactive form
  formBeverage = this.formBuilder.group({
    selectedBeverage: this.formBuilder.array([])
  });

  constructor(
    private beverageData: BeveragesDataService,
    private quantitySelectService: QuantitySelectService,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    // Get Data from API
    this.beverageData.getBeverages()
    .subscribe(beverage => {
      this.beveragesList = beverage;

      for (const key in this.beveragesList) {
        if (this.beveragesList.hasOwnProperty(key)) { // Check if object get key
          this.beveragesList[key].bevPriceTTC = this.beveragesList[key].bevPriceTTC.toFixed(2); // Display price with 00:00 form
        }
      }

      const selectedBeverage = this.formBeverage.get('selectedBeverage') as FormArray;

      for (const key in this.beveragesList) { // loop to access key of object
        if (this.beveragesList.hasOwnProperty(key)) {
          const beverageForm = this.formBuilder.group({
            idBeverages: [ this.beveragesList[key].idBeverages ],
            bevName: [ this.beveragesList[key].bevName ],
            bevPriceTTC: [this.beveragesList[key].bevPriceTTC ],
            bevQuantity: [0]
          });
          selectedBeverage.push(beverageForm); // push form in formArray
        }
      }
    });
  }

  onSubmit() {
    // User's beverage choice
    const orderBeverage = this.formBeverage.value;

    // Service's method to create object with class Order Beverage
    this.beverageData.createOrderBeverage(orderBeverage);

    this.resetFormBeverage(); // quantity return to 0
    this.enableSubmit = false;
  }

  quantitySelect(operator, i, quantity) {
   this.formBeverage.value.selectedBeverage[i].bevQuantity = this.quantitySelectService.selectQuantity(operator, quantity);

   if (this.formBeverage.value.selectedBeverage[i].bevQuantity > 0) {
     this.enableSubmit = true;
   } else {
     this.enableSubmit = false;
   }
  }

  resetFormBeverage() {
    for (const key in this.formBeverage.value) {
      if (this.formBeverage.value.hasOwnProperty(key)) {
        this.formBeverage.value[key].map(
          resetQuantity => resetQuantity.bevQuantity = 0
          );
      }
    }
  }
}
