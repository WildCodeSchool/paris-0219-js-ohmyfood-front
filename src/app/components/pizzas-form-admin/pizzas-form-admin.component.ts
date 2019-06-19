import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizzas-form-admin',
  templateUrl: './pizzas-form-admin.component.html',
  styleUrls: ['./pizzas-form-admin.component.scss']
})
export class PizzasFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  pizzaFormObject;
  pizzaFormAdd: FormGroup;
  pizzaFormPut: FormGroup;
  pizzaFormDel: FormGroup;
  valueAction = 'Ajouter';

  constructor(private pizzaService: PizzaService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get fA() { return this.pizzaFormAdd.controls; }

  get fM () { return this.pizzaFormPut.controls; }

  get fD () { return this.pizzaFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      pizzAction: ['Ajouter', Validators.required]
    })

    this.pizzaFormAdd = this.fb.group({
      pizzaName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      pizzDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      pizzPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.pizzaFormPut = this.fb.group({
      pizzaName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      pizzDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      pizzPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.pizzaFormDel = this.fb.group({
      pizzaName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.pizzaFormAdd.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.pizzaFormAdd.value.pizzaName,
        pizzDesc: this.pizzaFormAdd.value.pizzDesc,
        pizzPriceHt: parseFloat(this.pizzaFormAdd.value.pizzPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter la pizza ${this.pizzaFormAdd.value.pizzaName} ?`)) {
        const addPizzaType = this.pizzaService.addPizzaType().subscribe(_ => {
          this.pizzaFormAdd.reset();
          addPizzaType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.pizzaFormPut.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.pizzaFormPut.value.pizzaName,
        pizzDesc: this.pizzaFormPut.value.pizzDesc,
        pizzPriceHt: parseFloat(this.pizzaFormPut.value.pizzPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain de modifier la pizza ${this.pizzaFormPut.value.pizzaName} ?`)) {
        const putPizzaType = this.pizzaService.putPizzaType().subscribe(_ => {
          this.pizzaFormPut.reset();
          putPizzaType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.pizzaFormDel.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.pizzaFormDel.value.pizzaName
      };
      if (confirm(`Êtes-vous certain de supprimer la pizza ${this.pizzaFormDel.value.pizzaName} ?`)) {
        const delPizzaType = this.pizzaService.delPizzaType().subscribe(_ => {
          this.pizzaFormDel.reset();
          delPizzaType.unsubscribe();
        });
      }
    }
  }
}
