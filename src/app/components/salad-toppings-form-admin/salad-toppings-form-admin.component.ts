import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaladToppingsService } from 'src/app/services/salad-toppings.service';

@Component({
  selector: 'app-salad-toppings-form-admin',
  templateUrl: './salad-toppings-form-admin.component.html',
  styleUrls: ['./salad-toppings-form-admin.component.scss']
})
export class SaladToppingsFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  toppingFormObject;
  toppingFormAdd: FormGroup;
  toppingFormPut: FormGroup;
  toppingFormDel: FormGroup;
  toppingAction = 'Ajouter';

  constructor(private saladToppingService: SaladToppingsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get fA() { return this.toppingFormAdd.controls; }

  get fM () { return this.toppingFormPut.controls; }

  get fD () { return this.toppingFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      toppingAction: ['Ajouter', Validators.required]
    })

    this.toppingFormAdd = this.fb.group({
      toppingName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      topPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.toppingFormPut = this.fb.group({
      toppingName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      toppingPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.toppingFormDel = this.fb.group({
      toppingName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.toppingFormAdd.valid) {
      this.saladToppingService.toppingFormObject = {
        topName: this.toppingFormAdd.value.saladsToppingsName,
        topPriceHt: parseFloat(this.toppingFormAdd.value.saladsToppingsPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter le topping ${this.toppingFormAdd.value.saladsToppingsName} ?`)) {
        const addToppingType = this.saladToppingService.addToppingType().subscribe(_ => {
          this.toppingFormAdd.reset();
          addToppingType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.toppingFormPut.valid) {
      this.saladToppingService.toppingFormObject = {
        topName: this.toppingFormPut.value.saladsToppingsName,
        topPriceHt: parseFloat(this.toppingFormPut.value.saladsToppingsPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain de modifier le topping ${this.toppingFormPut.value.saladsToppingsName} ?`)) {
        const putToppingType = this.saladToppingService.putToppingType().subscribe(_ => {
          this.toppingFormPut.reset();
          putToppingType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.toppingFormDel.valid) {
      this.saladToppingService.toppingFormObject = {
        topName: this.toppingFormDel.value.saladsToppingsName
      };
      if (confirm(`Êtes-vous certain de supprimer le topping ${this.toppingFormDel.value.saladsToppingsName} ?`)) {
        const delToppingType = this.saladToppingService.delToppingType().subscribe(_ => {
          this.toppingFormDel.reset();
          delToppingType.unsubscribe();
        });
      }
    }
  }
}
