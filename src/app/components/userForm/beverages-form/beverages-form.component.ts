import { Component, OnInit } from '@angular/core';
import { BeveragesDataService } from 'src/app/services/beverages-data.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { ToggleFormService } from 'src/app/services/toggle-form.service';
import { CreateFormService } from 'src/app/services/create-form.service';
import { deliveryIntervalTime } from 'src/app/validators/deliveryTimeValidators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-beverages-form',
  templateUrl: './beverages-form.component.html',
  styleUrls: ['./beverages-form.component.scss'],
  providers: [DatePipe]
})
export class BeveragesFormComponent implements OnInit {

  date: Date = new Date();

  controlDate: string;

  // To toggle Form
  isToggle: boolean;

  // Reactive form
  formBeverage: FormGroup;

  constructor(
    private beverageData: BeveragesDataService,
    private createFormService: CreateFormService,
    private quantitySelectService: QuantitySelectService,
    private formBuilder: FormBuilder,
    private toggleService: ToggleFormService,
    private datePipe: DatePipe
    ) {this.controlDate = this.datePipe.transform(this.date, 'EEEE H:mm:ss'); }

  ngOnInit() {
    // init formDessert
    this.initFormBeverage();

    // Get Data from API
    const subscription = this.beverageData.getBeverages()
    .subscribe(beverages => {

      for (const key in beverages) {
        if (beverages.hasOwnProperty(key)) { // Check if object get key
          beverages[key].bevPriceTTC = beverages[key].bevPriceTTC.toFixed(2); // Display price with 00:00 form
        }
      }

      const selectedBeverage = this.formBeverage.get('selectedBeverage') as FormArray;

      for (const key in beverages) { // loop to access key of object
        if (beverages.hasOwnProperty(key)) {
          selectedBeverage.push(this.createFormService.createForm(beverages[key])); // push form in formArray
        }
      }
      subscription.unsubscribe();
    });
  }

  initFormBeverage() {
    this.formBeverage = this.formBuilder.group({
      selectedBeverage: this.formBuilder.array([])
    },
    {
      validators: deliveryIntervalTime(this.controlDate, false)
    });
  }

  get selectedBeverage(): FormArray {
    return this.formBeverage.get('selectedBeverage') as FormArray;
  }

  onSubmit() {
    // User's beverage choice
    const orderBeverage = this.formBeverage.value;

    // Service's method to create object with class Order Beverage
    this.beverageData.createOrderBeverage(orderBeverage);

    this.resetFormBeverage(); // quantity return to 0
  }

  quantitySelect(operator: string, i: number, quantity: number) {
   this.formBeverage.value.selectedBeverage[i].bevQuantity = this.quantitySelectService.selectQuantity(operator, quantity);

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

  toggleFormBeverage($event) {
    $event.preventDefault();
    this.isToggle = this.toggleService.toggleForm(this.isToggle);
  }

}
