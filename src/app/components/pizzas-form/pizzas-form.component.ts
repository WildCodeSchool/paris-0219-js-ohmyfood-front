import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { ToggleFormService } from 'src/app/services/toggle-form.service';

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
          const pizzasForm = this.formBuilder.group({
            idPizzas: pizzas[key].idPizzas,
            pizzDesc: pizzas[key].pizzDesc,
            pizzName: pizzas[key].pizzName,
            pizzPriceTTC: pizzas[key].pizzPriceTTC,
            pizzQuantity: 0
          });
          selectedPizzas.push(pizzasForm);
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

    this.resetFormDessert();

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

  resetFormDessert() {
    for (const key in this.formPizzas.value) {
      if (this.formPizzas.value.hasOwnProperty(key)) {
        this.formPizzas.value[key].map(
          resetQuantity => resetQuantity.pizzQuantity = 0
          );
      }
    }
  }

  toggleFormPizzas($event) {
    $event.preventDefault();
    this.isToggle = this.toggleService.toggleForm(this.isToggle);
  }

}
