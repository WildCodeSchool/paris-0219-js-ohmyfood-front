import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  isToggleBasket: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  
  displayToggleBasket(event) {
    event.preventDefault();
    if (this.isToggleBasket == false) {
      this.isToggleBasket = true;
    }else {
      this.isToggleBasket = false;
    }
  }
}
