import {SaladsBases} from 'src/app/class/order-saladsBases';
import {SaladsSauces} from 'src/app/class/order-saladsSauces';
import {SaladsIngredients} from 'src/app/class/order-saladsIngredients';
import { SaladsToppings} from 'src/app/class/order-saladsToppings';

export class OrderSalads {
  constructor(
    public orderSaladsBases: Array<SaladsBases>,
    public orderSaladsIngredients: Array<SaladsIngredients>,
    public orderSaladsToppings: Array<SaladsToppings>,
    public orderSaladsSauces: SaladsSauces,
    public orderSaladsPriceTotal: string,
    public orderSaladsQuantity: number,
  ) {}
}
