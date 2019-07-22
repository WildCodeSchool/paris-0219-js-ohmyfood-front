import { Component, OnInit } from '@angular/core';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { ToggleFormService } from 'src/app/services/toggle-form.service';
import { CreateFormService } from 'src/app/services/create-form.service';
import { DatePipe } from '@angular/common';
import { deliveryIntervalTime } from 'src/app/validators/deliveryTimeValidators';

@Component({
  selector: 'app-desserts-form',
  templateUrl: './desserts-form.component.html',
  styleUrls: ['./desserts-form.component.scss'],
  providers: [DatePipe]
})
export class DessertsFormComponent implements OnInit {

  // Date of order
  date: Date = new Date();

  // To have date in format wanted
  controlDate: string;

  // To toggle Form
  isToggle = false;

  // Reactive form
  formDessert: FormGroup;

  constructor(
    private dessertData: DessertsDataService,
    private createFormService: CreateFormService,
    private quantitySelectService: QuantitySelectService,
    private formBuilder: FormBuilder,
    private toggleService: ToggleFormService,
    private datePipe: DatePipe
    ) {this.controlDate = this.datePipe.transform(this.date, 'EEEE H:mm:ss'); }

  ngOnInit() {
    this.initFormDessert();

    // Get Data from API
    const subscription = this.dessertData.getDesserts()
    .subscribe(desserts => {

      for (const key in desserts) {
        if (desserts.hasOwnProperty(key)) { // Check if object get key
          desserts[key].dessPriceTTC = desserts[key].dessPriceTTC.toFixed(2); // Display price with 00:00 form
        }
      }

      const selectedDessert = this.formDessert.get('selectedDessert') as FormArray;

      for (const key in desserts) { // loop to access key of object
        if (desserts.hasOwnProperty(key)) {
          selectedDessert.push(this.createFormService.createForm(desserts[key])); // push form in formArray
        }
      }
      subscription.unsubscribe();
    });
  }

  initFormDessert() {
    this.formDessert = this.formBuilder.group({
      selectedDessert: this.formBuilder.array([])
    },
    {
      validators: deliveryIntervalTime(this.controlDate, false)
    });
  }

  get selectedDessert(): FormArray {
    return this.formDessert.get('selectedDessert') as FormArray;
  }

  onSubmit() {
    // User's dessert choice
    const orderDessert = this.formDessert.value;

    // Service's method to create object with class Order Dessert
    this.dessertData.createOrderDessert(orderDessert);

    this.resetFormDessert(); // quantity return to 0
  }

  quantitySelect(operator: string, i: number, quantity: number) {
   this.formDessert.value.selectedDessert[i].dessQuantity = this.quantitySelectService.selectQuantity(operator, quantity);

  }

  resetFormDessert() {
    for (const key in this.formDessert.value) {
      if (this.formDessert.value.hasOwnProperty(key)) {
        this.formDessert.value[key].map(
          resetQuantity => resetQuantity.dessQuantity = 0
          );
      }
    }
  }

  toggleFormDessert($event) {
    $event.preventDefault();
    this.isToggle = this.toggleService.toggleForm(this.isToggle);
  }
}
