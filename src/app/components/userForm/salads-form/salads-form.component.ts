import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { ToggleFormService } from 'src/app/services/toggle-form.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import {checkSaladsBase} from 'src/app/validators/saladsBaseValidators';
import { checkSaladsIngredients } from 'src/app/validators/saladsIngredientsValidators';
import { DatePipe } from '@angular/common';
import { deliveryIntervalTime } from 'src/app/validators/deliveryTimeValidators';

@Component({
  selector: 'app-salads-form',
  templateUrl: './salads-form.component.html',
  styleUrls: ['./salads-form.component.scss'],
  providers: [DatePipe]
})
export class SaladsFormComponent implements OnInit {

  @Output()
  public getControls: EventEmitter<any> = new EventEmitter();

  // To know if user selected menu
  // Get this information from menuSaladFormComponent
  @Input()
  menu: boolean;

  date: Date = new Date();

  controlDate: string;

  // To toggle Form
  isToggle: boolean;

  isToggleBase: boolean;
  isToggleSauce: boolean;
  isToggleToppings: boolean;
  isToggleIngredients: boolean;

  // To display saucesMessage and toppingsMessage
  displaySaucesMessage = true;
  displayToppingsMessage = true;

  // Reactive Form
  formSalads: FormGroup;

  constructor(
    private saladsDataService: SaladsDatasService,
    private quantitySelectService: QuantitySelectService,
    private ToggleForm: ToggleFormService,
    private fb: FormBuilder,
    private datePipe: DatePipe
    ) {this.controlDate = this.datePipe.transform(this.date, 'EEEE H:mm:ss'); }

  ngOnInit() {
    // Init formSalads
    this.initFormSalads();

    // Send form in saladPage to display error message in template
    this.getControls.emit(this.formSalads);

    const basesSubscription = this.saladsDataService.addSaladsBases().subscribe(bases => {

      for (const key in bases) {
        if (bases.hasOwnProperty(key)) {
          bases[key].saladsBasePriceTTC = bases[key].saladsBasePriceTTC.toFixed(2);
        }
      }
      const selectBase = this.formSalads.get('selectBase') as FormArray;

      for (const key in bases) {
        if (bases.hasOwnProperty(key)) {
          const saladsBaseForm = this.fb.group({
            idSaladsBase: bases[key].idSaladsBase,
            saladsBaseName: bases[key].saladsBaseName,
            saladsBasePriceTTC: bases[key].saladsBasePriceTTC,
            saladsBaseQuantity: false
          });
          selectBase.push(saladsBaseForm);
        }
      }
      basesSubscription.unsubscribe();
    });

    const ingredientsSubscription = this.saladsDataService.addSaladsIngredients().subscribe(ingredients => { // get ingredients from API

      for (const key in ingredients) { // Display price TTC with two digits after decimal point
        if (ingredients.hasOwnProperty(key)) {
          ingredients[key].saladsIngredientsPriceTTC = ingredients[key].saladsIngredientsPriceTTC.toFixed(2);
        }
      }
      const selectIngredients = this.formSalads.get('selectIngredients') as FormArray; // Declare key as form array

      for (const key in ingredients) { // create form for each object from data base
        if (ingredients.hasOwnProperty(key)) {
          const saladsIngredientsForm = this.fb.group({
            idSaladsIngredients: ingredients[key].idSaladsIngredients,
            saladsIngredientsName: ingredients[key].saladsIngredientsName,
            saladsIngredientsPriceTTC: ingredients[key].saladsIngredientsPriceTTC,
            saladsIngredientsQuantity: 0
          });
          selectIngredients.push(saladsIngredientsForm); // push all form in the formArray
        }
      }
      ingredientsSubscription.unsubscribe(); // Unsubscription to Observable
    });

    const saucesSubscription = this.saladsDataService.addSaladsSauces().subscribe(sauces => {

      const selectSauces = this.formSalads.get('selectSauces') as FormArray;

      for (const key in sauces) {
        if (sauces.hasOwnProperty(key)) {
          const saladsSaucesForm = this.fb.group({
            idSaladsSauces: sauces[key].idSaladsSauces,
            saladsSaucesName: sauces[key].saladsSaucesName,
            saladsSaucesQuantity: false
          });
          selectSauces.push(saladsSaucesForm);
        }
      }
      saucesSubscription.unsubscribe();
    });

    const toppingsSubscription = this.saladsDataService.addSaladsToppings().subscribe(toppings => {

      for (const key in toppings) {
        if (toppings.hasOwnProperty(key)) {
          toppings[key].saladsToppingsPriceTTC = toppings[key].saladsToppingsPriceTTC.toFixed(2);
        }
      }
      const selectToppings = this.formSalads.get('selectToppings') as FormArray;

      for (const key in toppings) {
        if (toppings.hasOwnProperty(key)) {
          const saladsToppingsForm = this.fb.group({
            idSaladsToppings: toppings[key].idSaladsToppings,
            saladsToppingsName: toppings[key].saladsToppingsName,
            saladsToppingsPriceTTC: toppings[key].saladsToppingsPriceTTC,
            saladsToppingsQuantity: 0
          });
          selectToppings.push(saladsToppingsForm);
        }
      }
      toppingsSubscription.unsubscribe();
    });
  }

  initFormSalads() {
    this.formSalads = this.fb.group({
      selectBase: this.fb.array([], checkSaladsBase()),
      selectIngredients: this.fb.array([], checkSaladsIngredients()),
      selectToppings: this.fb.array([]),
      selectSauces: this.fb.array([])
  },
  {
    validators: deliveryIntervalTime(this.controlDate, false)
  });
  }

  get selectBase(): FormArray {
    return this.formSalads.get('selectBase') as FormArray;
  }

  get selectIngredients(): FormArray {
    return this.formSalads.get('selectIngredients') as FormArray;
  }

  get selectSauces(): FormArray {
    return this.formSalads.get('selectSauces') as FormArray;
  }

  get selectToppings(): FormArray {
    return this.formSalads.get('selectToppings') as FormArray;
  }

  onSubmit() {
    const OrderSalads = this.formSalads.value;

    this.saladsDataService.createOrderSalads(OrderSalads, this.menu);

    this.displayToppingsMessage = true;
    this.displaySaucesMessage = true;

    this.resetFormSalads();
  }

  quantitySelect(operator: string, i: number, quantity: number, saladsComponent: any) {
    const check = Object.getOwnPropertyNames(saladsComponent.value); // to check what quantity have to change

    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue; // method to calculate max of an array

    if (check[0] === 'idSaladsIngredients') {

      this.formSalads.controls.selectIngredients[`controls`][i].patchValue({
        saladsIngredientsQuantity: this.quantitySelectService.selectQuantity(operator, quantity)
      });

    } else if (check[0] === 'idSaladsToppings') {
      this.formSalads.controls.selectToppings[`controls`][i].patchValue({
        saladsToppingsQuantity: this.quantitySelectService.selectQuantity(operator, quantity)
      });

      // Get toppings quantity in an array
      let totalToppings = this.formSalads.controls.selectToppings.value.map(
        (toppingsTotal: any) => toppingsTotal.saladsToppingsQuantity
        );

      totalToppings = totalToppings.reduce(reducer); // To count total Toppings to display message or not
      totalToppings > 0 ? this.displayToppingsMessage = false : this.displayToppingsMessage = true;
    }
   }

   toggleFormSalads($event: any, params: any) {
     $event.preventDefault();

     if (params === 'form') {
      this.isToggle = this.ToggleForm.toggleForm(this.isToggle);
     } else if (params === 'base') {
        this.isToggleBase = this.ToggleForm.toggleForm(this.isToggleBase);
    } else if ( params === 'toppings') {
        this.isToggleToppings = this.ToggleForm.toggleForm(this.isToggleToppings);
    } else if ( params === 'ingredients') {
        this.isToggleIngredients = this.ToggleForm.toggleForm(this.isToggleIngredients);
    } else if ( params === 'sauce') {
      this.isToggleSauce = this.ToggleForm.toggleForm(this.isToggleSauce);
    }


  }

  resetFormSalads() {
    for (const key in this.formSalads.value) {
      if (this.formSalads.value.hasOwnProperty(key)) {

        if (key === 'selectBase') {
          this.formSalads.controls[key][`controls`].map(
            (result: any) => result.controls.saladsBaseQuantity.reset(false)
          );

        } else if (key === 'selectIngredients') {
            this.formSalads.controls[key][`controls`].map(
              (result: any) => result.controls.saladsIngredientsQuantity.reset(0)
            );

        } else if (key === 'selectToppings') {
            this.formSalads.controls[key][`controls`].map(
              (result: any) => result.controls.saladsToppingsQuantity.reset(0)
                );

        } else if (key === 'selectSauces') {
            this.formSalads.controls[key][`controls`].map(
              (result: any) => result.controls.saladsSaucesQuantity.reset(false)
                );
        }
      }
    }
  }

  // To get user's sauces choice
  getSauce(index: number, formSubmit: boolean) {
    let count = 0; // To count how many value = 0 to display message

    const length = this.formSalads.controls.selectSauces[`controls`].length; // To get array length

    for (let i = 0; i < length; i ++) {
      if (index !== i && !formSubmit) {
        this.formSalads.controls.selectSauces[`controls`][i].value.saladsSaucesQuantity = false;
      }

      if (this.formSalads.controls.selectSauces[`controls`][i].value.saladsSaucesQuantity === false) {
        count ++;

        if (count === this.formSalads.controls.selectSauces[`controls`].length || count === 0) {
          this.displaySaucesMessage = true;

        } else {
          this.displaySaucesMessage = false;
        }
      }
    }
  }

  // Method to reset sauces before submit form
  resetSauces() {
    this.formSalads.controls.selectSauces[`controls`].map(
      (sauces: any) => sauces.controls.saladsSaucesQuantity.reset(false)
    );
  }
}
