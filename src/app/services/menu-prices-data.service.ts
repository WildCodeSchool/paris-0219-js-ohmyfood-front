import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuPizza } from '../class/menu-pizza';
import { FormGroup } from '@angular/forms';

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

  createOrderMenuSessionStorage(object: any) {
    return new MenuPizza(
      object.pizza,
      object.beverage,
      object.dessert,
      object.menuPizzPrice
    );
  }

  // Get choice of user in menu
  getRadioButton(form: FormGroup, index: number, choice: object, check: string[]) {
    if (check[0] === 'idPizzas') {
      const length = form.controls.pizza[`controls`].length; // To get array length

      for (let i = 0; i < length; i ++) {
        index !== i ?
        form.controls.pizza[`controls`][i].value.pizzQuantity = 0 :
        form.controls.pizza[`controls`][i].value.pizzQuantity = 1;
        }
      return form;

    } else if (check[0] === 'idBeverages') {
        const length = form.controls.beverage[`controls`].length; // To get array length

        for (let i = 0; i < length; i ++) {
          index !== i ?
          form.controls.beverage[`controls`][i].value.bevQuantity = 0 :
          form.controls.beverage[`controls`][i].value.bevQuantity = 1;
          }
        return form;

    } else if (check[0] === 'idDesserts') {
        const length = form.controls.dessert[`controls`].length; // To get array length

        for (let i = 0; i < length; i ++) {
          index !== i ?
          form.controls.dessert[`controls`][i].value.dessQuantity = 0 :
          form.controls.dessert[`controls`][i].value.dessQuantity = 1;
          }
        return form;
    }
  }
}
