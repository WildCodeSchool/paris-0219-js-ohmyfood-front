import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent {
  formSubmit: boolean;
  regexPrice = /[0-9]+[.]+[0-9]*/gm
  pizzaForm = new FormGroup({
    pizzaName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    pizzDesc: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    pizzPriceHt: new FormControl('', [Validators.required, , Validators.maxLength(6), Validators.pattern(this.regexPrice)]),
    idTax: new FormControl('')
  })

  pizzaFormObject;
  constructor(private pizzaService: PizzaService) { }

  onSubmit() {
    this.formSubmit = true;
    this.pizzaFormObject = {
        pizzName: this.pizzaForm.value.pizzaName, 
        pizzDesc: this.pizzaForm.value.pizzDesc, 
        pizzPriceHt: parseFloat(this.pizzaForm.value.pizzPriceHt), 
        idTax: this.pizzaForm.value.idTax
    }
    
    this.pizzaService.pizzaFormObject = this.pizzaFormObject;
    this.pizzaService.addPizzaType().subscribe(data => data);
    this.formSubmit = false;
    this.pizzaForm.value.pizzName = '';
    this.pizzaForm.value.pizzDesc = '';
    this.pizzaForm.value.pizzPriceHt = '';
    this.pizzaForm.value.idTax  = '';
  }
}
