import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  regexPrice = /[0-9]+[.]+[0-9]*/gm
  pizzaFormObject;
  pizzaForm: FormGroup;

  constructor(private pizzaService: PizzaService, private fb: FormBuilder) { }

  ngOnInit() {
    this.pizzaForm = this.fb.group({
      pizzaName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      pizzDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      pizzPriceHt: ['', [Validators.required, Validators.maxLength(6), Validators.pattern(this.regexPrice)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.pizzaForm.controls; }

  onSubmit() {
    if (this.pizzaForm.valid) {
      this.pizzaService.pizzaFormObject = {
        pizzName: this.pizzaForm.value.pizzaName,
        pizzDesc: this.pizzaForm.value.pizzDesc,
        pizzPriceHt: parseFloat(this.pizzaForm.value.pizzPriceHt),
        idTax: 1
      };
      this.pizzaService.addPizzaType().subscribe(data => data);
      this.pizzaForm.reset();
    }
  }
}
