import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';

@Component({
  selector: 'app-pizza-page',
  templateUrl: './pizza-page.component.html',
  styleUrls: ['./pizza-page.component.scss']
})
export class PizzaPageComponent implements OnInit {

  today: string;

  formPizza: FormGroup;

  orderStatusForm: FormGroup;

  constructor(private fb: FormBuilder, private pizzaDataService: PizzasDataService) { }

  ngOnInit() {
    this.initOrderStatusForm();
  }

  onGetDay($event: string) {
    this.today = $event;
  }

  onGetControl($event: FormGroup) {
    this.formPizza = $event;
  }

  initOrderStatusForm() {
    this.orderStatusForm = this.fb.group({
      orderStatus: ''
    });
  }

  getOrderStatus(orderStatus: string) {
    this.pizzaDataService.transmitOrderStatus.emit(orderStatus);
  }

}
