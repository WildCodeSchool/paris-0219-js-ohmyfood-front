import { OrderSalads } from './order-salads';
import { OrderBeverage } from './order-beverage';
import { OrderDessert } from './order-dessert';

export class MenuSalad {
  constructor(
    public salad: OrderSalads,
    public beverage: OrderBeverage,
    public dessert: OrderDessert,
    public menuSaladPriceTotal: number,
    public menuSaladQuantity: number
  ) {}
}
