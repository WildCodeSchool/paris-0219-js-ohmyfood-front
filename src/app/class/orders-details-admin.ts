import { FinalOrder } from './final-order';
import { OrderPizzas } from './order-pizzas';
import { OrderSalads } from './order-salads';
import { OrderBeverage } from './order-beverage';
import { OrderDessert } from './order-dessert';
import { MenuPizza } from './menu-pizza';
import { MenuSalad } from './menu-salad';

export class OrdersDetailsAdmin extends FinalOrder {
  constructor(
    public idOrder: number,
    public dateOrder: string,
    public orderPrice: number,
    public orderMessage: string,
    public clientLastName: string,
    public clientFirstName: string,
    public clientMail: string,
    public clientPhoneNumber: number,
    public userAddressFacturation: string,
    public userDeliveryAddress: string,
    public userMessage: string,
    public pizza: OrderPizzas[],
    public salad: OrderSalads[],
    public beverage: OrderBeverage[],
    public dessert: OrderDessert[],
    public menuPizza: MenuPizza[],
    public menuSalad: MenuSalad[]
  ) {
    super(pizza, salad, beverage, dessert, menuPizza, menuSalad);
  }
}
