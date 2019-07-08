import { OrderPizzas } from './order-pizzas';
import { OrderSalads } from './order-salads';
import { OrderBeverage } from './order-beverage';
import { OrderDessert } from './order-dessert';

export class FinalOrder {
  constructor(
    public pizza: OrderPizzas[],
    public salad: OrderSalads[],
    public beverage: OrderBeverage[],
    public dessert: OrderDessert[]
  ) {}
}
