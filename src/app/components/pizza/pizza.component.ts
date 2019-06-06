import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  formSubmit = false;
  regexPrice = /[0-9]+[.]+[0-9]*/gm
  pizzaFormObject;
  pizzaForm;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzaForm = new FormGroup({
      pizzaName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      pizzDesc: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      pizzPriceHt: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern(this.regexPrice)]),
      idTax: new FormControl('')
    });
  }

  get fPizzaName() { return this.pizzaForm.get('pizzaName') }
  get fPizzDesc() { return this.pizzaForm.get('pizzDesc') }
  get fPizzPriceHt() { return this.pizzaForm.get('pizzPriceHt') }
  get fIdTax() { return this.pizzaForm.get('idTax') }

  onSubmit() {
    this.formSubmit = true;
    if (this.pizzaForm.valid) {
     /* this.pizzaService.pizzaFormObject = {
        pizzName: this.fPizzaName, 
        pizzDesc: this.fPizzDesc, 
        pizzPriceHt: parseFloat(this.fPizzPriceHt), 
        idTax: this.fIdTax
      };*/
    };
    this.pizzaService.addPizzaType().subscribe(data => data);
  }
}
