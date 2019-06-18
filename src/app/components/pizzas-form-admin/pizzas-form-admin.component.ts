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
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  pizzaFormObject;
  pizzaForm: FormGroup;
  valueAction = '';

  constructor(private pizzaService: PizzaService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.pizzaForm.controls; }

  initForm() {
    this.pizzaForm = this.fb.group({
      pizzAction: ['', Validators.required],
      pizzaName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      pizzDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      pizzPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
  }

  onSubmit() {
    if (this.pizzaForm.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.pizzaForm.value.pizzaName,
        pizzDesc: this.pizzaForm.value.pizzDesc,
        pizzPriceHt: parseFloat(this.pizzaForm.value.pizzPriceHt),
        idTax: 1
      };
      if (this.pizzaForm.value.pizzAction === 'Ajouter') {
        if (confirm(`Êtes-vous certain d'ajouter la pizza ${this.pizzaForm.value.pizzaName} ?`)) {
          const addPizzaType = this.pizzaService.addPizzaType().subscribe(_ => {
            this.pizzaForm.reset();
            addPizzaType.unsubscribe();
          });
        }
      }else if (this.pizzaForm.value.pizzAction === 'Modifier') {
        if (confirm(`Êtes-vous certain de modifier la pizza ${this.pizzaForm.value.pizzaName} ?`)) {
          const changePizzaType = this.pizzaService.changePizzaType().subscribe(_ => {
            this.pizzaForm.reset();
            changePizzaType.unsubscribe();
          });
          console.log('Pizza modifiée')  
        } 
      }else if (this.pizzaForm.value.pizzAction === 'Retirer') {
        if (confirm(`Êtes-vous certain de supprimer la pizza ${this.pizzaForm.value.pizzaName} ?`)) {
          const deletePizzaType = this.pizzaService.deletePizzaType().subscribe(_ => {
            this.pizzaForm.reset();
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
    if (this.actions[index] == 'Ajouter') {
      return console.log("ajouter")
    }
    if (this.actions[index] == 'Modifier') {
      return console.log("Modifier")
    }
    if (this.actions[index] == 'Retirer') {
      return console.log("Supprimer")
    }
  }
}
