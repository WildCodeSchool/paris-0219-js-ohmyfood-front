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
  checkBox = [true, false, false];
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  pizzaFormObject;
  pizzaFormAdd: FormGroup;
  pizzaFormPut: FormGroup;
  pizzaFormDel: FormGroup;
  selectedForm: FormGroup;
  valueAction = '';

  constructor(private pizzaService: PizzaService, private fb: FormBuilder) { }

  ngOnInit() {

    this.initForm();
  }

  // convenience getter for easy access to form fields
  get fA() { return this.pizzaFormAdd.controls; }

  get fM () { return this.pizzaFormPut.controls; }

  get fD () { return this.pizzaFormDel.controls; }

  initForm() {
    this.pizzaFormAdd = this.fb.group({
      pizzAction: ['Ajouter', Validators.required],
      pizzaName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      pizzDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      pizzPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.pizzaFormPut = this.fb.group({
      pizzAction: ['', Validators.required],
      pizzaName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      pizzDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      pizzPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.pizzaFormDel = this.fb.group({
      pizzAction: ['', Validators.required],
      pizzaName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmit() {
    if (this.selectedForm.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.selectedForm.value.pizzaName,
        pizzDesc: this.selectedForm.value.pizzDesc,
        pizzPriceHt: parseFloat(this.selectedForm.value.pizzPriceHt),
        idTax: 1
      };
      if (this.selectedForm.value.pizzAction === 'Ajouter') {
        if (confirm(`Êtes-vous certain d'ajouter la pizza ${this.selectedForm.value.pizzaName} ?`)) {
          const addPizzaType = this.pizzaService.addPizzaType().subscribe(_ => {
            this.selectedForm.reset();
            addPizzaType.unsubscribe();
          });
        }
      }else if (this.selectedForm.value.pizzAction === 'Modifier') {
        if (confirm(`Êtes-vous certain de modifier la pizza ${this.selectedForm.value.pizzaName} ?`)) {
          const changePizzaType = this.pizzaService.changePizzaType().subscribe(_ => {
            this.selectedForm.reset();
            changePizzaType.unsubscribe();
          });
          console.log('Pizza modifiée')  
        } 
      }else if (this.selectedForm.value.pizzAction === 'Retirer') {
        if (confirm(`Êtes-vous certain de supprimer la pizza ${this.selectedForm.value.pizzaName} ?`)) {
          const deletePizzaType = this.pizzaService.deletePizzaType().subscribe(_ => {
            this.selectedForm.reset();
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
      this.selectedForm = this.pizzaFormAdd;
      return console.log(this.valueAction)
    }
    if (this.valueAction === 'Modifier') {
      this.selectedForm = this.pizzaFormPut;
      return console.log(this.valueAction)
    }
    if (this.valueAction === 'Retirer') {
      this.selectedForm = this.pizzaFormDel;
      return console.log(this.valueAction)
    }
  }
}
