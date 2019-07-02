import { Component, OnInit } from '@angular/core';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { ToggleFormService } from 'src/app/services/toggle-form.service';
import { FormBuilder, FormArray } from '@angular/forms';
import {checkSaladsBase} from 'src/app/validators/saladsBaseValidators';
import { checkSaladsIngredients } from 'src/app/validators/saladsIngredientsValidators';

@Component({
  selector: 'app-salads-form',
  templateUrl: './salads-form.component.html',
  styleUrls: ['./salads-form.component.scss']
})
export class SaladsFormComponent implements OnInit {
  // Object to get data from databases
  saladsSaucesList: object;
  saladsIngredientsList: object;
  saladsBaseList: object;
  saladsToppingsList: object;

  selectSaladsBase: object;

  // To toggle Form
  isToggle: boolean;

  // To display saucesMessage and toppingsMessage
  displaySaucesMessage = true;
  displayToppingsMessage = true;

  // Reactive Form
  formSalads = this.fb.group({
      selectBase: this.fb.array([], checkSaladsBase()),
      selectIngredients: this.fb.array([], checkSaladsIngredients()),
      selectToppings: this.fb.array([]),
      selectSauces: this.fb.array([])
  });

  constructor(
    private saladsDataService: SaladsDatasService,
    private quantitySelectService: QuantitySelectService,
    private ToggleForm: ToggleFormService,
    private fb: FormBuilder,

    ) {}

  ngOnInit() {
    const basesSubscription = this.saladsDataService.addSaladsBases().subscribe(bases => {
      this.saladsBaseList = bases;

      for (const key in this.saladsBaseList) {
        if (this.saladsBaseList.hasOwnProperty(key)) {
          this.saladsBaseList[key].saladsBasePriceTTC = this.saladsBaseList[key].saladsBasePriceTTC.toFixed(2);
        }
      }
      const selectBase = this.formSalads.get('selectBase') as FormArray;

      for (const key in this.saladsBaseList) {
        if (this.saladsBaseList.hasOwnProperty(key)) {
          const saladsBaseForm = this.fb.group({
            idSaladsBase: [ this.saladsBaseList[key].idSaladsBase],
            saladsBaseName: [ this.saladsBaseList[key].saladsBaseName],
            saladsBasePriceTTC: [ this.saladsBaseList[key].saladsBasePriceTTC],
            saladsBaseQuantity: [false]
          });
          selectBase.push(saladsBaseForm);
        }
      }
      basesSubscription.unsubscribe();
    });

    const ingredientsSubscription = this.saladsDataService.addSaladsIngredients().subscribe(ingredients => { // get ingredients from API
      this.saladsIngredientsList = ingredients;

      for (const key in this.saladsIngredientsList) { // Display price TTC with two digits after decimal point
        if (this.saladsIngredientsList.hasOwnProperty(key)) {
          this.saladsIngredientsList[key].saladsIngredientsPriceTTC = this.saladsIngredientsList[key].saladsIngredientsPriceTTC.toFixed(2);
        }
      }
      const selectIngredients = this.formSalads.get('selectIngredients') as FormArray; // Declare key as form array

      for (const key in this.saladsIngredientsList) { // create form for each object from data base
        if (this.saladsIngredientsList.hasOwnProperty(key)) {
          const saladsIngredientsForm = this.fb.group({
            idSaladsIngredients: [ this.saladsIngredientsList[key].idSaladsIngredients],
            saladsIngredientsName: [ this.saladsIngredientsList[key].saladsIngredientsName],
            saladsIngredientsPriceTTC: [ this.saladsIngredientsList[key].saladsIngredientsPriceTTC],
            saladsIngredientsQuantity: [0]
          });
          selectIngredients.push(saladsIngredientsForm); // push all form in the formArray
        }
      }
      ingredientsSubscription.unsubscribe(); // Unsubscription to Observable
    });

    const saucesSubscription = this.saladsDataService.addSaladsSauces().subscribe(sauces => {
      this.saladsSaucesList = sauces;

      const selectSauces = this.formSalads.get('selectSauces') as FormArray;

      for (const key in this.saladsSaucesList) {
        if (this.saladsSaucesList.hasOwnProperty(key)) {
          const saladsSaucesForm = this.fb.group({
            idSaladsSauces: [ this.saladsSaucesList[key].idSaladsSauces],
            saladsSaucesName: [ this.saladsSaucesList[key].saladsSaucesName],
            saladsSaucesQuantity: [ false ]
          });
          selectSauces.push(saladsSaucesForm);
        }
      }
      saucesSubscription.unsubscribe();
    });

    const toppingsSubscription = this.saladsDataService.addSaladsToppings().subscribe(toppings => {
      this.saladsToppingsList = toppings;

      for (const key in this.saladsToppingsList) {
        if (this.saladsToppingsList.hasOwnProperty(key)) {
          this.saladsToppingsList[key].saladsToppingsPriceTTC = this.saladsToppingsList[key].saladsToppingsPriceTTC.toFixed(2);
        }
      }
      const selectToppings = this.formSalads.get('selectToppings') as FormArray;

      for (const key in this.saladsToppingsList) {
        if (this.saladsToppingsList.hasOwnProperty(key)) {
          const saladsToppingsForm = this.fb.group({
            idSaladsToppings: [ this.saladsToppingsList[key].idSaladsToppings],
            saladsToppingsName: [ this.saladsToppingsList[key].saladsToppingsName],
            saladsToppingsPriceTTC: [ this.saladsToppingsList[key].saladsToppingsPriceTTC],
            saladsToppingsQuantity: [0]
          });
          selectToppings.push(saladsToppingsForm);
        }
      }
      toppingsSubscription.unsubscribe();
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

    this.saladsDataService.createOrderSalads(OrderSalads);

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

   toggleFormSalads($event: any) {
    $event.preventDefault();
    this.isToggle = this.ToggleForm.toggleForm(this.isToggle);
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
