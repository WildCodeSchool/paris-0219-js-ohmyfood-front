import { Component, OnInit } from '@angular/core';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { TestBed } from '@angular/core/testing';

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
    this.dessertData.getDesserts()
    .subscribe(dessert => {
      this.dessertsList = dessert;
      console.log(this.dessertsList);

      for (const key in this.dessertsList) {
        if (this.dessertsList.hasOwnProperty(key)) {
          this.dessertsList[key].dessPriceTTC = this.dessertsList[key].dessPriceTTC.toFixed(2);
        }
      }

      const selectedDessert = this.formDessert.get('selectedDessert') as FormArray;

      for (const key in this.dessertsList) { // loop to access key of object
        if (this.dessertsList.hasOwnProperty(key)) {
          const dessertForm = this.formBuilder.group({
            idDesserts: [ this.dessertsList[key].idDesserts ],
            dessName: [ this.dessertsList[key].dessName ],
            dessQuantity: [0]
          });
          selectedDessert.push(dessertForm); // push form in formArray
        }
      }
      console.log(this.formDessert);
    });
  }

  onSubmit() {
    const orderDessert = this.formDessert.value; // User's dessert choice
    console.log(orderDessert);
  }

  quantitySelect(operator, i, quantity) {
   this.formDessert.value.selectedDessert[i].dessQuantity = this.quantitySelectService.selectQuantity(operator, quantity);
  }
}
