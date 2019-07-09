import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { ToggleFormService } from 'src/app/services/toggle-form.service';
import { CreateFormService } from 'src/app/services/create-form.service';

@Component({
  selector: 'app-pizzas-form',
  templateUrl: './pizzas-form.component.html',
  styleUrls: ['./pizzas-form.component.scss']
})
export class PizzasFormComponent implements OnInit {

  enableSubmit: boolean;

  isToggle: boolean;

  formPizzas = this.formBuilder.group({
    selectedPizzas: this.formBuilder.array([])
  });

  constructor(
    private pizzasData: PizzasDataService,
    private createFormService: CreateFormService,
    private formBuilder: FormBuilder,
    private quantitySelectService: QuantitySelectService,
    private toggleService: ToggleFormService
    ) { }

  ngOnInit() {
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

  get selectedPizzas(): FormArray {
    return this.formPizzas.get('selectedPizzas') as FormArray;
  }

  onSubmit() {
    const orderPizzas = this.formPizzas.value;

    this.pizzasData.createOrderPizzas(orderPizzas);

    this.resetFormPizzas();

    this.enableSubmit = false;
  }

  quantitySelect(operator: string, i: number, quantity: number) {
    this.formPizzas.value.selectedPizzas[i].pizzQuantity = this.quantitySelectService.selectQuantity(operator, quantity);

    if (this.formPizzas.value.selectedPizzas[i].pizzQuantity > 0) {
      this.enableSubmit = true;
    } else {
      this.enableSubmit = false;
    }
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
