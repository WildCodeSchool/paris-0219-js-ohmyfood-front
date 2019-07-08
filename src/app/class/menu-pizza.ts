import { OrderPizzas } from './order-pizzas';
import { OrderBeverage } from './order-beverage';
import { OrderDessert } from './order-dessert';

export class MenuPizza {
  constructor(
    public pizza: OrderPizzas,
    public beverage: OrderBeverage,
    public dessert: OrderDessert,
    public menuPizzPrice: number
  ) {}
}
