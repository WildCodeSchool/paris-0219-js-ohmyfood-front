import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  regexPrice = /[0-9]+[.]+[0-9]*/gm
  pizzaFormObject;
  pizzaForm;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzaForm = new FormGroup({
      pizzaName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
      pizzDesc: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
      pizzPriceHt: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern(this.regexPrice)])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.pizzaForm.controls; }

  onSubmit() {
    if (this.pizzaForm.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.pizzaForm.value.pizzaName, 
        pizzDesc: this.pizzaForm.value.pizzDesc, 
        pizzPriceHt: parseFloat(this.pizzaForm.value.pizzPriceHt)
      };
      this.pizzaService.addPizzaType().subscribe(data => data);
      this.pizzaForm.setValue({pizzaName: '', pizzDesc: '', pizzPriceHt: ''});
    };
  }
}
