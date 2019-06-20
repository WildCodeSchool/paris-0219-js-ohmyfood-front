import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaService } from 'src/app/services/pizza.service';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';

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
  pizzaDataObject;
  pizzaFormAdd: FormGroup;
  pizzaFormPut: FormGroup;
  pizzaFormDel: FormGroup;
  tabStr = [];
  valueAction = 'Ajouter';

  constructor(private pizzaService: PizzaService, private pizzaDataService: PizzasDataService,private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    const getPizzaObs = this.pizzaDataService.getPizzas().subscribe(data => {
      this.pizzaDataObject = data;
      getPizzaObs.unsubscribe();
    });
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
      pizzaName: ['', Validators.required],
      pizzaNewName: [''],
      pizzDesc: [''],
      pizzPriceHt: ['', Validators.pattern(this.regexPrice)]
    });
    this.pizzaFormDel = this.fb.group({
      pizzaName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.pizzaFormAdd.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.toJadenCase(this.pizzaFormAdd.value.pizzaName),
        pizzDesc: this.pizzaFormAdd.value.pizzDesc,
        pizzPriceHt: parseFloat(this.pizzaFormAdd.value.pizzPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter la pizza ${this.pizzaFormAdd.value.pizzaName} ?`)) {
        const addPizzaType = this.pizzaService.addPizzaType().subscribe(_ => {
          const getPizzaObs = this.pizzaDataService.getPizzas().subscribe(data => {
            this.pizzaDataObject = data;
            getPizzaObs.unsubscribe();
          });
          this.pizzaFormAdd.reset();
          addPizzaType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.pizzaFormPut.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.toJadenCase(this.pizzaFormPut.value.pizzaName),
        idTax: 1
      };
      if (this.pizzaFormPut.value.pizzaNewName !==  '') {
        this.pizzaService.pizzaFormObject.pizzName += '|' + this.toJadenCase(this.pizzaFormPut.value.pizzaNewName)
      }
      if (this.pizzaFormPut.value.pizzDesc !==  '') {
        this.pizzaService.pizzaFormObject.pizzDesc = this.pizzaFormPut.value.pizzDesc
      }
      if (this.pizzaFormPut.value.pizzPriceHt !== '') {
        this.pizzaService.pizzaFormObject.pizzPriceHt = parseFloat(this.pizzaFormPut.value.pizzPriceHt)
      }
      if (confirm(`Êtes-vous certain de modifier la pizza ${this.pizzaFormPut.value.pizzaName} ?`)) {
        const putPizzaType = this.pizzaService.putPizzaType().subscribe(_ => {
          const getPizzaObs = this.pizzaDataService.getPizzas().subscribe(data => {
            this.pizzaDataObject = data;
            getPizzaObs.unsubscribe();
          });
          this.pizzaFormPut.reset();
          putPizzaType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.pizzaFormDel.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.toJadenCase(this.pizzaFormDel.value.pizzaName)
      };
      if (confirm(`Êtes-vous certain de supprimer la pizza ${this.pizzaFormDel.value.pizzaName} ?`)) {
        const delPizzaType = this.pizzaService.delPizzaType().subscribe(_ => {
          const getPizzaObs = this.pizzaDataService.getPizzas().subscribe(data => {
            this.pizzaDataObject = data;
            getPizzaObs.unsubscribe();
          });
          this.pizzaFormDel.reset();
          delPizzaType.unsubscribe();
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
