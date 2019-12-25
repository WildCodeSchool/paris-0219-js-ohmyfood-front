import { OrderPizzas } from './order-pizzas';
import { OrderSalads } from './order-salads';
import { OrderBeverage } from './order-beverage';
import { OrderDessert } from './order-dessert';
import { MenuPizza } from './menu-pizza';
import { MenuSalad } from './menu-salad';

export class FinalOrder {
  constructor(
    public pizza: OrderPizzas[],
    public salad: OrderSalads[],
    public beverage: OrderBeverage[],
    public dessert: OrderDessert[],
    public menuPizza: MenuPizza[],
    public menuSalad: MenuSalad[]
  ) {}
}
