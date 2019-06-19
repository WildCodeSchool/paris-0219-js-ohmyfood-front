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

  onSubmit() {
    if (this.formCheck.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.formCheck.value.pizzaName,
        pizzDesc: this.formCheck.value.pizzDesc,
        pizzPriceHt: parseFloat(this.formCheck.value.pizzPriceHt),
        idTax: 1
      };
      if (this.formCheck.value.pizzAction === 'Ajouter') {
        if (confirm(`Êtes-vous certain d'ajouter la pizza ${this.formCheck.value.pizzaName} ?`)) {
          const addPizzaType = this.pizzaService.addPizzaType().subscribe(_ => {
            this.formCheck.reset();
            addPizzaType.unsubscribe();
          });
        }
      }else if (this.formCheck.value.pizzAction === 'Modifier') {
        if (confirm(`Êtes-vous certain de modifier la pizza ${this.formCheck.value.pizzaName} ?`)) {
          const changePizzaType = this.pizzaService.changePizzaType().subscribe(_ => {
            this.formCheck.reset();
            changePizzaType.unsubscribe();
          });
          console.log('Pizza modifiée')  
        } 
      }else if (this.formCheck.value.pizzAction === 'Retirer') {
        if (confirm(`Êtes-vous certain de supprimer la pizza ${this.formCheck.value.pizzaName} ?`)) {
          const deletePizzaType = this.pizzaService.deletePizzaType().subscribe(_ => {
            this.formCheck.reset();
            deletePizzaType.unsubscribe();
          });
          console.log('Pizza supprimée')
        }
      }else{
        return
      }
    }
  }

  getActionName(i) {
    let index = i;
    this.valueAction = this.actions[index];
    if (this.valueAction === 'Ajouter') {
      this.formCheck = this.pizzaFormAdd;
      return console.log(this.valueAction)
    }
    if (this.valueAction === 'Modifier') {
      this.formCheck = this.pizzaFormPut;
      return console.log(this.valueAction)
    }
    if (this.valueAction === 'Retirer') {
      this.formCheck = this.pizzaFormDel;
      return console.log(this.valueAction)
    }
  }
}
