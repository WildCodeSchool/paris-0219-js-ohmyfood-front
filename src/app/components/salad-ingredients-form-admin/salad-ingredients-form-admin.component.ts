import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaladIngredientsService } from 'src/app/services/salad-ingredients.service';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';

@Component({
  selector: 'app-salad-ingredients-form-admin',
  templateUrl: './salad-ingredients-form-admin.component.html',
  styleUrls: ['./salad-ingredients-form-admin.component.scss']
})
export class SaladIngredientsFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  ingredientFormObject;
  ingredientDataObject;
  ingredientFormAdd: FormGroup;
  ingredientFormPut: FormGroup;
  ingredientFormDel: FormGroup;
  tabStr = [];
  valueAction = 'Ajouter';

  constructor(private saladIngredientService: SaladIngredientsService, private saladsDataService: SaladsDatasService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    const getIngredientObs = this.saladsDataService.addSaladsIngredients().subscribe(data => {
      this.ingredientDataObject = data;
      getIngredientObs.unsubscribe();
    })
  }

  // convenience getter for easy access to form fields
  get fA() { return this.ingredientFormAdd.controls; }

  get fM () { return this.ingredientFormPut.controls; }

  get fD () { return this.ingredientFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      ingredientAction: ['Ajouter', Validators.required]
    })

    this.ingredientFormAdd = this.fb.group({
      ingredientName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      ingredientPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.ingredientFormPut = this.fb.group({
      ingredientName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      ingredientNewName: [''],
      ingredientPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.ingredientFormDel = this.fb.group({
      ingredientName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.ingredientFormAdd.valid) {
      this.saladIngredientService.ingredientFormObject = {
        ingName: this.toJadenCase(this.ingredientFormAdd.value.ingredientName),
        ingPriceHt: parseFloat(this.ingredientFormAdd.value.ingredientPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter l' ingredient ${this.ingredientFormAdd.value.ingredientName} ?`)) {
        const addIngredientType = this.saladIngredientService.addIngredientType().subscribe(_ => {
          const getIngredientObs = this.saladsDataService.addSaladsIngredients().subscribe(data => {
            this.ingredientDataObject = data;
            getIngredientObs.unsubscribe();
          });
          this.ingredientFormAdd.reset();
          addIngredientType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.ingredientFormPut.valid) {
      this.saladIngredientService.ingredientFormObject = {
        ingName: this.toJadenCase(this.ingredientFormPut.value.ingredientName),
        idTax: 1
      };
      if (this.ingredientFormPut.value.ingredientNewName !== '') {
        this.saladIngredientService.ingredientFormObject.ingredientName += '|' + this.toJadenCase(this.ingredientFormPut.value.ingredientNewName)
      }
      if (this.ingredientFormPut.value.ingredientPriceHt !== '') {
        this.saladIngredientService.ingredientFormObject.ingredientPriceHt = parseFloat(this.ingredientFormPut.value.ingredientPriceHt)
      }
      if (confirm(`Êtes-vous certain de modifier l' ingredient ${this.ingredientFormPut.value.ingredientName} ?`)) {
        const putIngredientType = this.saladIngredientService.putIngredientType().subscribe(_ => {
          const getIngredientObs = this.saladsDataService.addSaladsIngredients().subscribe(data => {
            this.ingredientDataObject = data;
            getIngredientObs.unsubscribe();
          });
          this.ingredientFormPut.reset();
          putIngredientType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.ingredientFormDel.valid) {
      this.saladIngredientService.ingredientFormObject = {
        ingName: this.toJadenCase(this.ingredientFormDel.value.ingredientName)
      };
      if (confirm(`Êtes-vous certain de supprimer l' ingredient ${this.ingredientFormDel.value.ingredientName} ?`)) {
        const delIngredientType = this.saladIngredientService.delIngredientType().subscribe(_ => {
          const getIngredientObs = this.saladsDataService.addSaladsIngredients().subscribe(data => {
            this.ingredientDataObject = data;
            getIngredientObs.unsubscribe();
          });
          this.ingredientFormDel.reset();
          delIngredientType.unsubscribe();
        });
      }
    }
  }

  toJadenCase(strin) {
    this.tabStr = strin.split(' ');
    this.tabStr = this.tabStr.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return this.tabStr.join(' ');
  }
}
