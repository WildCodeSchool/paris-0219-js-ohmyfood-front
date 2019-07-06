import { Component, OnInit } from '@angular/core';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { ToggleFormService } from 'src/app/services/toggle-form.service';

@Component({
  selector: 'app-desserts-form',
  templateUrl: './desserts-form.component.html',
  styleUrls: ['./desserts-form.component.scss']
})
export class DessertsFormComponent implements OnInit {

  // Enable submit button
  enableSubmit: boolean;

  // To toggle Form
  isToggle = false;

  // Reactive form
  formDessert = this.formBuilder.group({
    selectedDessert: this.formBuilder.array([])
  });

  constructor(
    private dessertData: DessertsDataService,
    private quantitySelectService: QuantitySelectService,
    private formBuilder: FormBuilder,
    private toggleService: ToggleFormService
    ) {}

  ngOnInit() {
    // Get Data from API
    this.dessertData.getDesserts()
    .subscribe(desserts => {

      for (const key in desserts) {
        if (desserts.hasOwnProperty(key)) { // Check if object get key
          desserts[key].dessPriceTTC = desserts[key].dessPriceTTC.toFixed(2); // Display price with 00:00 form
        }
      }

      const selectedDessert = this.formDessert.get('selectedDessert') as FormArray;

      for (const key in desserts) { // loop to access key of object
        if (desserts.hasOwnProperty(key)) {
          const dessertForm = this.formBuilder.group({
            idDesserts: desserts[key].idDesserts,
            dessName: desserts[key].dessName,
            dessPriceTTC: desserts[key].dessPriceTTC,
            dessQuantity: 0
          });
          selectedDessert.push(dessertForm); // push form in formArray
        }
      }
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
    this.enableSubmit = false;
  }

  quantitySelect(operator: string, i: number, quantity: number) {
   this.formDessert.value.selectedDessert[i].dessQuantity = this.quantitySelectService.selectQuantity(operator, quantity);

   if (this.formDessert.value.selectedDessert[i].dessQuantity > 0) {
     this.enableSubmit = true;
   } else {
     this.enableSubmit = false;
   }
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
