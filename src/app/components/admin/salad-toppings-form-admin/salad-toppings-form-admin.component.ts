import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaladToppingsService } from 'src/app/services/salad-toppings.service';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';

@Component({
  selector: 'app-salad-toppings-form-admin',
  templateUrl: './salad-toppings-form-admin.component.html',
  styleUrls: ['./salad-toppings-form-admin.component.scss']
})
export class SaladToppingsFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/m;
  toppingFormObject;
  toppingDataObject;
  toppingFormAdd: FormGroup;
  toppingFormPut: FormGroup;
  toppingFormDel: FormGroup;
  tabStr = [];
  toppingAction = 'Ajouter';

  constructor(private saladToppingService: SaladToppingsService, private saladsDataService: SaladsDatasService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    const getToppingObs = this.saladsDataService.addSaladsToppings().subscribe(data => {
      this.toppingDataObject = data;
      getToppingObs.unsubscribe();
    });
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
      toppingName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      toppingPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.toppingFormPut = this.fb.group({
      toppingName: ['', Validators.required],
      toppingNewName: [''],
      toppingPriceHt: ['', Validators.pattern(this.regexPrice)]
    });
    this.toppingFormDel = this.fb.group({
      toppingName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.toppingFormAdd.valid) {
      this.saladToppingService.toppingFormObject = {
        saladsToppingsName: this.toJadenCase(this.toppingFormAdd.value.toppingName),
        saladsToppingsPriceHt: parseFloat(this.toppingFormAdd.value.toppingPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter le topping ${this.toppingFormAdd.value.toppingName} ?`)) {
        const addToppingType = this.saladToppingService.addToppingType().subscribe(_ => {
          const getToppingObs = this.saladsDataService.addSaladsToppings().subscribe(data => {
            this.toppingDataObject = data;
            getToppingObs.unsubscribe();
          });
          this.toppingFormAdd.reset();
          addToppingType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.toppingFormPut.valid) {
      this.saladToppingService.toppingFormObject = {
        saladsToppingsName: this.toJadenCase(this.toppingFormPut.value.toppingName),
        idTax: 1
      };
      if (this.toppingFormPut.value.toppingNewName !== '' && this.toppingFormPut.value.toppingNewName !== null) {
        this.saladToppingService.toppingFormObject.saladsToppingsName += '|' + this.toJadenCase(this.toppingFormPut.value.toppingNewName)
      }
      if (this.toppingFormPut.value.toppingPriceHt !== '' && this.toppingFormPut.value.toppingPriceHt !== null ) {
        this.saladToppingService.toppingFormObject.saladsToppingsPriceHt = parseFloat(this.toppingFormPut.value.toppingPriceHt)
      }
      if (confirm(`Êtes-vous certain de modifier le topping ${this.toppingFormPut.value.toppingName} ?`)) {
        const putToppingType = this.saladToppingService.putToppingType().subscribe(_ => {
          const getToppingObs = this.saladsDataService.addSaladsToppings().subscribe(data => {
            this.toppingDataObject = data;
            getToppingObs.unsubscribe();
          });
          this.toppingFormPut.reset();
          putToppingType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.toppingFormDel.valid) {
      this.saladToppingService.toppingFormObject = {
        saladsToppingsName: this.toJadenCase(this.toppingFormDel.value.toppingName)
      };
      if (confirm(`Êtes-vous certain de supprimer le topping ${this.toppingFormDel.value.toppingName} ?`)) {
        const delToppingType = this.saladToppingService.delToppingType().subscribe(_ => {
          const getToppingObs = this.saladsDataService.addSaladsToppings().subscribe(data => {
            this.toppingDataObject = data;
            getToppingObs.unsubscribe();
          });
          this.toppingFormDel.reset();
          delToppingType.unsubscribe();
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
