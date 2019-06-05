import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicePizzaService } from 'src/app/services/service-pizza.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  
  pizzaForm = new FormGroup({
    idPizza: new FormControl(''),
    pizzaName: new FormControl(''),
    pizzDesc: new FormControl(''),
    pizzPriceHt: new FormControl(''),
    pizzPicture: new FormControl(''),
    idTax: new FormControl('')
  })

  pizzaFormTable;
  constructor(private pizzaService: ServicePizzaService) { }

  ngOnInit() {
   // this.pizzaFormTable = this.pizzaService.pizzaFormTable;
  }

  onSubmit() {
    this.pizzaFormTable = {
        idPizzas: this.pizzaForm.value.idPizza,
        pizzName: this.pizzaForm.value.pizzaName, 
        pizzDesc: this.pizzaForm.value.pizzDesc, 
        pizzPriceHt: this.pizzaForm.value.pizzPriceHt, 
        pizzPictures: this.pizzaForm.value.pizzPicture,
        idTax: this.pizzaForm.value.idTax
      
    }
      this.pizzaService.pizzaFormTable = this.pizzaFormTable;
      console.log(this.pizzaService.pizzaFormTable)
      this.pizzaService.addPizzaType().subscribe(data => console.log(data));
  }
}
