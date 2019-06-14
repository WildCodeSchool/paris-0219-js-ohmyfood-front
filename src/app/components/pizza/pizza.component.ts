import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
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
<<<<<<< HEAD
      this.pizzaService.addPizzaType().subscribe(data => data);
      this.pizzaForm.reset();
=======
      const addPizzaType = this.pizzaService.addPizzaType().subscribe(_ => {
        this.pizzaForm.reset();
        addPizzaType.unsubscribe();
      });
>>>>>>> 2520220529f89471f025892ade2d25ebf4b5e9c6
    }
  }
}
