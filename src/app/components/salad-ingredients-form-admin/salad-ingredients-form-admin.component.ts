import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaladIngredientsService } from 'src/app/services/salad-ingredients.service';

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
  ingredientFormAdd: FormGroup;
  ingredientFormPut: FormGroup;
  ingredientFormDel: FormGroup;
  valueAction = 'Ajouter';

  constructor(private saladIngredientService: SaladIngredientsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
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
      ingredientPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.ingredientFormDel = this.fb.group({
      ingredientName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.ingredientFormAdd.valid) {
      this.saladIngredientService.ingredientFormObject = {
        ingName: this.ingredientFormAdd.value.beverageName,
        ingPriceHt: parseFloat(this.ingredientFormAdd.value.saladsIngredientsPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter l' ingredient ${this.ingredientFormAdd.value.saladsIngredientsName} ?`)) {
        const addIngredientType = this.saladIngredientService.addIngredientType().subscribe(_ => {
          this.ingredientFormAdd.reset();
          addIngredientType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.ingredientFormPut.valid) {
      this.saladIngredientService.ingredientFormObject = {
        ingName: this.ingredientFormPut.value.beverageName,
        ingPriceHt: parseFloat(this.ingredientFormPut.value.saladsIngredientsPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain de modifier l' ingredient ${this.ingredientFormPut.value.saladsIngredientName} ?`)) {
        const putIngredientType = this.saladIngredientService.putIngredientType().subscribe(_ => {
          this.ingredientFormPut.reset();
          putIngredientType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.ingredientFormDel.valid) {
      this.saladIngredientService.ingredientFormObject = {
        ingName: this.ingredientFormDel.value.Name
      };
      if (confirm(`Êtes-vous certain de supprimer l' ingredient ${this.ingredientFormDel.value.saladsIngredientsName} ?`)) {
        const delIngredientType = this.saladIngredientService.delIngredientType().subscribe(_ => {
          this.ingredientFormDel.reset();
          delIngredientType.unsubscribe();
        });
      }
    }
  }
}
