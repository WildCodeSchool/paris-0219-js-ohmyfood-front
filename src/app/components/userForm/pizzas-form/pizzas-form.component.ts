import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output()
  public getDay: EventEmitter<any> = new EventEmitter();

  @Output()
  public getControls: EventEmitter<any> = new EventEmitter();

  today: string;

  date: Date = new Date();

  controlDate: string;

  isToggle: boolean;

  formPizzas: FormGroup;

  ohMyMardiPizzPrice: object;

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

    this.getControls.emit(this.formPizzas);

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

    // Get price of myMardi
    const ohMyMardiSubscription = this.pizzasData.getOhMyMardiPrice()
    .subscribe(ohMyMardiPrice => {

      this.ohMyMardiPizzPrice = ohMyMardiPrice;
      this.today = this.controlDate.split(' ')[0]; // Control day of order

      // Transfert day to parent component
      this.getDay.emit(this.today);

      if (this.today === 'Tuesday') {
        this.ohMyMardiPrice();
      }
      ohMyMardiSubscription.unsubscribe();
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

  ohMyMardiPrice() {
    for (const pizza of this.formPizzas.controls.selectedPizzas[`controls`]) {
      pizza.controls.pizzPriceTTC.patchValue(
        this.ohMyMardiPizzPrice[0].pizzPriceReducTTC.toFixed(2)
      );
    }
  }

  toggleFormPizzas($event) {
    $event.preventDefault();
    this.isToggle = this.toggleService.toggleForm(this.isToggle);
  }

}
