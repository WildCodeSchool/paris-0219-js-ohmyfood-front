import { Component, OnInit } from '@angular/core';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';
import { ToggleFormService } from 'src/app/services/toggle-form.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { OrderSalads } from 'src/app/class/order-salads';

@Component({
  selector: 'app-salads',
  templateUrl: './salads.component.html',
  styleUrls: ['./salads.component.scss']
})
export class SaladsComponent implements OnInit {
  saladsSaucesList;
  saladsIngredientsList;
  saladsBaseList;
  saladsToppingsList;

  selectSaladsBase: object;




   // To toggle Form
   isToggle: boolean;

   // Enable submit button
  enableSubmit: boolean;


  saladsFormTable = this.fb.group({
      selectBase: this.fb.array([]),
      selectIngredients: this.fb.array([]),
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
      console.log(this.saladsBaseList);

      for (const key in this.saladsBaseList) {
        if (this.saladsBaseList.hasOwnProperty(key)) {
          this.saladsBaseList[key].saladsBasePriceTTC = this.saladsBaseList[key].saladsBasePriceTTC.toFixed(2);
        }
      }
      const selectBase = this.saladsFormTable.get('selectBase') as FormArray;

      for (const key in this.saladsBaseList) {
        if (this.saladsBaseList.hasOwnProperty(key)) {
          const saladsBaseFormTable = this.fb.group({
            idSaladsBase: [ this.saladsBaseList[key].idSaladsBase],
            saladsBaseName: [ this.saladsBaseList[key].saladsBaseName],
            saladsBasePriceTTC: [ this.saladsBaseList[key].saladsBasePriceTTC],
            saladsBaseQuantity: [0]
          });
          selectBase.push(saladsBaseFormTable);
        }
      }
      console.log(this.saladsFormTable);
      basesSubscription.unsubscribe();
    });

    const ingredientsSubscription = this.saladsDataService.addSaladsIngredients().subscribe(ingredients => { // get ingredients from API
      this.saladsIngredientsList = ingredients;
      console.log(this.saladsIngredientsList);

      for (const key in this.saladsBaseList) { // Display price TTC with two digits after decimal point
        if (this.saladsIngredientsList.hasOwnProperty(key)) {
          this.saladsIngredientsList[key].saladsIngredientsPriceTTC = this.saladsIngredientsList[key].saladsIngredientsPriceTTC.toFixed(2);
        }
      }
      const selectIngredients = this.saladsFormTable.get('selectIngredients') as FormArray; // Declare key as form array

      for (const key in this.saladsIngredientsList) { // create form for each object from data base
        if (this.saladsIngredientsList.hasOwnProperty(key)) {
          const saladsIngredientsFormTable = this.fb.group({
            idSaladsIngredients: [ this.saladsIngredientsList[key].idSaladsIngredients],
            saladsIngredientsName: [ this.saladsIngredientsList[key].saladsIngredientsName],
            saladsIngredientsPriceTTC: [ this.saladsIngredientsList[key].saladsIngredientsPriceTTC],
            saladsIngredientsQuantity: [0]
          });
          selectIngredients.push(saladsIngredientsFormTable); // push all form in the formArray
        }
      }
      ingredientsSubscription.unsubscribe(); // Unsubscription to Observable
    });

    const saucesSubscription = this.saladsDataService.addSaladsSauces().subscribe(sauces => {
      this.saladsSaucesList = sauces;
      console.log(this.saladsSaucesList);

      const selectSauces = this.saladsFormTable.get('selectSauces') as FormArray;

      for (const key in this.saladsSaucesList) {
        if (this.saladsSaucesList.hasOwnProperty(key)) {
          const saladsSaucesFormTable = this.fb.group({
            idSaladsSauces: [ this.saladsSaucesList[key].idSaladsSauces],
            saladsSaucesName: [ this.saladsSaucesList[key].saladsSaucesName],
          });
          selectSauces.push(saladsSaucesFormTable);
        }
      }
      saucesSubscription.unsubscribe();
    });

    const toppingsSubscription = this.saladsDataService.addSaladsToppings().subscribe(toppings => {
      this.saladsToppingsList = toppings;
      console.log(this.saladsToppingsList);

      for (const key in this.saladsToppingsList) {
        if (this.saladsToppingsList.hasOwnProperty(key)) {
          this.saladsToppingsList[key].saladsToppingsPriceTTC = this.saladsToppingsList[key].saladsToppingsPriceTTC.toFixed(2);
        }
      }
      const selectToppings = this.saladsFormTable.get('selectToppings') as FormArray;

      for (const key in this.saladsToppingsList) {
        if (this.saladsToppingsList.hasOwnProperty(key)) {
          const saladsToppingsFormTable = this.fb.group({
            idSaladsToppings: [ this.saladsToppingsList[key].idSaladsToppings],
            saladsToppingssName: [ this.saladsToppingsList[key].saladsToppingssName],
            saladsToppingssPriceTTC: [ this.saladsToppingsList[key].saladsToppingssPriceTTC],
            saladsToppingssQuantity: [0]
          });
          selectToppings.push(saladsToppingsFormTable);
        }
      }
      toppingsSubscription.unsubscribe();
    });
  }

  get selectBase(): FormArray {
    return this.saladsFormTable.get('selectBase') as FormArray;
  }

  get selectIngredients(): FormArray {
    return this.saladsFormTable.get('selectIngredients') as FormArray;
  }

  get selectSauces(): FormArray {
    return this.saladsFormTable.get('selectSauces') as FormArray;
  }

  get selectToppings(): FormArray {
    return this.saladsFormTable.get('selectToppings') as FormArray;
  }

  onSubmit() {
// tslint:disable-next-line: no-shadowed-variable
    const OrderSalads = this.saladsFormTable.value;


    this.saladsDataService.createOrderSalads(OrderSalads);

    this.enableSubmit = false;
  }
  quantitySelect(operator, i, quantity) {

    this.saladsFormTable.value.selectSaladsBase[i].saladsBaseQuantity = this.quantitySelectService.selectQuantity(operator, quantity);
    console.log(this.saladsFormTable);

    this.saladsFormTable.value.selectSaladsBases[i].saladsBasesQuantity = this.quantitySelectService.selectQuantity(operator, quantity);

// tslint:disable-next-line: max-line-length
    this.saladsToppingsFormTable.value.selectSaladsBases[i].saladsBasesQuantity = this.quantitySelectService.selectQuantity(operator, quantity);
// tslint:disable-next-line: max-line-length
    this.saladsSaucesFormTable.value.selectSaladsBases[i].saladsBasesQuantity = this.quantitySelectService.selectQuantity(operator, quantity);

    if (this.saladsBasesFormTable.value.selectSaladsBases[i].saladsBasesQuantity > 0) {
      this.enableSubmit = true;
    } else {
      this.enableSubmit = false;
    }
   }
   toggleFormSalads($event) {
    $event.preventDefault();
    this.isToggle = this.ToggleForm.toggleForm(this.isToggle);
  }
}
