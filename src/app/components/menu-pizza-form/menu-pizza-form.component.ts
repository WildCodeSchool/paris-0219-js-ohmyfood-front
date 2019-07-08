import { Component, OnInit } from '@angular/core';
import { MenuPricesDataService } from 'src/app/services/menu-prices-data.service';

@Component({
  selector: 'app-menu-pizza-form',
  templateUrl: './menu-pizza-form.component.html',
  styleUrls: ['./menu-pizza-form.component.scss']
})
export class MenuPizzaFormComponent implements OnInit {

  constructor(private menuPrices: MenuPricesDataService) { }

  ngOnInit() {
    this.menuPrices.getMenuPrices()
    .subscribe(menuPrice => console.log(menuPrice));
  }
}
