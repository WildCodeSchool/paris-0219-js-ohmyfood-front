import { Component, OnInit } from '@angular/core';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {

  // Datas collection from database
  dessertsList: object;

  inputValue = 0;

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

      const selectedDessert = this.formDessert.get('selectedDessert') as FormArray;
// tslint:disable-next-line: forin
      for (const key in this.dessertsList) { // loop to access key of object

        const dessertForm = this.formBuilder.group({
          idDesserts: [ this.dessertsList[key].idDesserts ],
          dessName: [ this.dessertsList[key].dessName ],
          dessQuantity: [this.inputValue]
        });

        selectedDessert.push(dessertForm); // push form in formArray
      }
      console.log(selectedDessert.value);
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
