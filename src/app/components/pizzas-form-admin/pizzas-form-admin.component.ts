import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizzas-form-admin',
  templateUrl: './pizzas-form-admin.component.html',
  styleUrls: ['./pizzas-form-admin.component.scss']
})
export class PizzasFormAdminComponent implements OnInit {
  regexPrice = /^\d{0,2}(\.\d{1,2})?$/gm;
  pizzaFormObject;
  pizzaForm: FormGroup;

  constructor(private pizzaService: PizzaService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.pizzaForm.controls; }

  initForm() {
    this.pizzaForm = this.fb.group({
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
      const addPizzaType = this.pizzaService.addPizzaType().subscribe(_ => {
        this.pizzaForm.reset();
        addPizzaType.unsubscribe();
      });
    }
  }
}
