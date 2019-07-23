import { OrderSalads } from './order-salads';
import { SaladsSauces } from './order-saladsSauces';

export class OrderSaladsAdmin extends OrderSalads {
  constructor(
    public orderSaladComposedIdOrders: number,
    public orderSaladsBases: Array<any>,
    public orderSaladsIngredients: Array<any>,
    public orderSaladsToppings: Array<any>,
    public orderSaladsSauces: SaladsSauces,
    public orderSaladsPriceTotal: number,
    public orderSaladsQuantity: number,
  ) {
    super(
      orderSaladsBases,
      orderSaladsIngredients,
      orderSaladsToppings,
      orderSaladsSauces,
      orderSaladsPriceTotal,
      orderSaladsQuantity,
      );
  }
}
