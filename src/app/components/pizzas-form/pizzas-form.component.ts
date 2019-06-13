import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';

@Component({
  selector: 'app-pizzas-form',
  templateUrl: './pizzas-form.component.html',
  styleUrls: ['./pizzas-form.component.scss']
})
export class PizzasFormComponent implements OnInit {

  pizzasList: object;

  constructor(private pizzasData: PizzasDataService) { }

  ngOnInit() {
    this.pizzasData.getPizzas()
    .subscribe(pizzas => {
      this.pizzasList = pizzas;
      console.log(this.pizzasData);
    });
  }

}
