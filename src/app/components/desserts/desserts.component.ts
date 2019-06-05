import { Component, OnInit } from '@angular/core';
import { DessertsDataService } from 'src/app/services/desserts-data.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {

  dessertsList: object;

  formDessert = this.formBuilder.group({
    selectedDessert: this.formBuilder.array([])
  });

  constructor(
    private dessertData: DessertsDataService,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.dessertData.getDesserts()
    .subscribe(dessert => {
      this.dessertsList = dessert;
      console.log(this.dessertsList);

// tslint:disable-next-line: forin
      for (const key in this.dessertsList) {

        const dessertForm = this.formBuilder.group({
          id: [ this.dessertsList[key].idDesserts ],
          name: [ this.dessertsList[key].dessName ],
          quantity: ['']
        });

        const selectedDessert = this.formDessert.get('selectedDessert') as FormArray;
        selectedDessert.push(dessertForm);
      }
      console.log(this.formDessert);
    });
  }

  onSubmit() {
    console.log(this.formDessert.value);
  }
}
