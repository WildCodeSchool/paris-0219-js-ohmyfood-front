import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuPizza } from '../class/menu-pizza';

@Injectable({
  providedIn: 'root'
})
export class MenuPricesDataService {

  menuPricesRoute = 'http://localhost:3000/menuPrices';

  @Output()
  getMenuPizza: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getMenuPrices(): Observable<object> {
    return this.http.get(this.menuPricesRoute);
  }

  createOrderMenu(userMenuChoice: object) {
    // Get each choice. Sort form result
    const pizza = userMenuChoice[`pizza`].filter((userPizza: any) => userPizza.pizzQuantity > 0);
    const beverage = userMenuChoice[`beverage`].filter((userBeverage: any) => userBeverage.bevQuantity > 0);
    const dessert = userMenuChoice[`dessert`].filter((userDessert: any) => userDessert.dessQuantity > 0);

    // Create instance of MenuPizza
    const menuPizza = new MenuPizza(
      pizza[0],
      beverage[0],
      dessert[0],
      userMenuChoice[`pizzaMenuPrice`].pizzaMenuPrice
    );
    this.getMenuPizza.emit(menuPizza); // Emit object to basketComponent
  }
}
