import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pizza-page',
  templateUrl: './pizza-page.component.html',
  styleUrls: ['./pizza-page.component.scss']
})
export class PizzaPageComponent implements OnInit {

  today: string;

  formPizza: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  onGetDay($event: string) {
    this.today = $event;
  }

  onGetControl($event: FormGroup) {
    this.formPizza = $event;
  }

}
