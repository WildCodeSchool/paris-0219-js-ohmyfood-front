import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { ToggleFormService } from 'src/app/services/toggle-form.service';
import { CreateFormService } from 'src/app/services/create-form.service';
import { DatePipe } from '@angular/common';
import { deliveryIntervalTime } from 'src/app/validators/deliveryTimeValidators';

@Component({
  selector: 'app-pizzas-form',
  templateUrl: './pizzas-form.component.html',
  styleUrls: ['./pizzas-form.component.scss'],
  providers: [DatePipe]
})
export class PizzasFormComponent implements OnInit {

  date: Date = new Date();

  controlDate: string;

  isToggle: boolean;

  formPizzas: FormGroup;

  constructor(
    private pizzasData: PizzasDataService,
    private createFormService: CreateFormService,
    private formBuilder: FormBuilder,
    private quantitySelectService: QuantitySelectService,
    private toggleService: ToggleFormService,
    private datePipe: DatePipe
    ) { this.controlDate = this.datePipe.transform(this.date, 'EEEE H:mm:ss'); }

  ngOnInit() {
    // init formPizzas
    this.initFormPizzas();

    const subscription = this.pizzasData.getPizzas()
    .subscribe(pizzas => {

      for (const key in pizzas) {
        if (pizzas.hasOwnProperty(key)) {
          pizzas[key].pizzPriceTTC = pizzas[key].pizzPriceTTC.toFixed(2);
        }
      }

      const selectedPizzas = this.formPizzas.get('selectedPizzas') as FormArray;

      for (const key in pizzas) {
        if (pizzas.hasOwnProperty(key)) {
          selectedPizzas.push(this.createFormService.createForm(pizzas[key]));
        }
      }
      subscription.unsubscribe();
    });
  }

  initFormPizzas() {
    this.formPizzas = this.formBuilder.group({
      selectedPizzas: this.formBuilder.array([])
    },
    {
      validators: deliveryIntervalTime(this.controlDate, false)
    });
  }

  get selectedPizzas(): FormArray {
    return this.formPizzas.get('selectedPizzas') as FormArray;
  }

  onSubmit() {
    const orderPizzas = this.formPizzas.value;

    this.pizzasData.createOrderPizzas(orderPizzas);

    this.resetFormPizzas();
  }

  quantitySelect(operator: string, i: number, quantity: number) {
    this.formPizzas.value.selectedPizzas[i].pizzQuantity = this.quantitySelectService.selectQuantity(operator, quantity);
  }

  resetFormPizzas() {
    for (const key in this.formPizzas.value) {
      if (this.formPizzas.value.hasOwnProperty(key)) {
        this.formPizzas.value[key].map(
          (resetQuantity: any) => resetQuantity.pizzQuantity = 0
          );
      }
    }
  }

  toggleFormPizzas($event) {
    $event.preventDefault();
    this.isToggle = this.toggleService.toggleForm(this.isToggle);
  }

}
