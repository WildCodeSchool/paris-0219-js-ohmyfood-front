import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';

@Component({
  selector: 'app-pizza-page',
  templateUrl: './pizza-page.component.html',
  styleUrls: ['./pizza-page.component.scss']
})
export class PizzaPageComponent implements OnInit {

  ohMyMardiPrice: object;

  orderStatus: string;

  today: string;

  formPizza: FormGroup;

  orderStatusForm: FormGroup;

  constructor(private fb: FormBuilder, private pizzaDataService: PizzasDataService) { }

  ngOnInit() {
    this.initOrderStatusForm();

    // get price for tuesday reduction on pizzas
    this.pizzaDataService.getOhMyMardiPrice()
    .subscribe(MyMardiPrice => {
      this.ohMyMardiPrice = MyMardiPrice;
    });
  }

  onGetDay($event: string) {
    this.today = $event;
  }

  onGetControl($event: FormGroup) {
    this.formPizza = $event;
  }

  initOrderStatusForm() {
    if (localStorage.getItem('orderStatus')) {
      this.orderStatus = JSON.parse(localStorage.getItem('orderStatus'));

      this.orderStatus === 'delivery' ? this.orderStatus = 'Livraison' : this.orderStatus = 'À emporter';

      this.orderStatusForm = this.fb.group({
        orderStatus: this.orderStatus
      });

    } else {
      this.orderStatusForm = this.fb.group({
        orderStatus: 'À emporter'
      });
    }
  }

  getOrderStatus(orderStatus: string) {
    localStorage.setItem('orderStatus', JSON.stringify(orderStatus));

    this.pizzaDataService.transmitOrderStatus.emit(orderStatus);
  }

}
