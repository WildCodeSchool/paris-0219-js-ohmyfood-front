import { Component, OnInit } from '@angular/core';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {

  // Datas collection from database
  dessertsList: object;

  // Reactive form
  formDessert = this.formBuilder.group({
    selectedDessert: this.formBuilder.array([])
  });

  constructor(
    private dessertData: DessertsDataService,
    private quantitySelectService: QuantitySelectService,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    // Get Data from API
    this.dessertData.getDesserts()
    .subscribe(dessert => {
      this.dessertsList = dessert;

      for (const key in this.dessertsList) {
        if (this.dessertsList.hasOwnProperty(key)) { // Check if object get key
          this.dessertsList[key].dessPriceTTC = this.dessertsList[key].dessPriceTTC.toFixed(2); // Display price with 00:00 form
        }
      }

      const selectedDessert = this.formDessert.get('selectedDessert') as FormArray;

      for (const key in this.dessertsList) { // loop to access key of object
        if (this.dessertsList.hasOwnProperty(key)) {
          const dessertForm = this.formBuilder.group({
            idDesserts: [ this.dessertsList[key].idDesserts ],
            dessName: [ this.dessertsList[key].dessName ],
            dessPriceTTC: [this.dessertsList[key].dessPriceTTC ],
            dessQuantity: [0]
          });
          selectedDessert.push(dessertForm); // push form in formArray
        }
      }
    });
  }

  onSubmit() {
    // User's dessert choice
    const orderDessert = this.formDessert.value;

    // Service's method to create object with class Order Dessert
    this.dessertData.createOrderDessert(orderDessert);

    this.resetFormDessert(); // quantity return to 0
  }

  quantitySelect(operator, i, quantity) {
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
}
