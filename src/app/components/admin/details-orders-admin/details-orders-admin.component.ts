import { Component, OnInit } from '@angular/core';
import { GetOrdersDetailsAdminService } from 'src/app/services/get-orders-details-admin.service';
import { OrdersDetailsAdmin } from 'src/app/class/orders-details-admin';
import { OrderSaladsAdmin } from 'src/app/class/order-salads-admin';

@Component({
  selector: 'app-details-orders-admin',
  templateUrl: './details-orders-admin.component.html',
  styleUrls: ['./details-orders-admin.component.scss']
})
export class DetailsOrdersAdminComponent implements OnInit {

  constructor(private getOrdersAdminService: GetOrdersDetailsAdminService) { }

  // List who regroup all orders from database to display it in template
  listOfOrders: OrdersDetailsAdmin[] = [];

  ngOnInit() {
    // Get all details order from database
    this.getOrdersAdminService.getDetailsOrdersAdmin()
    .subscribe(detailsOrders => {

      // Make loop to regroup all informations of each orders
      for (const user of detailsOrders[0] ) {
        const pizzaList = [];
        const beverageList = [];
        const dessertList = [];
        const menuPizzList = [];
        const saladsComposedList = [];
        const menuSaladsComposedList = [];

        // Get all pizzas
        for (const pizza of detailsOrders[2]) {
          if (pizza.idOrders === user.idOrders) {
            pizzaList.push(pizza);
          }
        }

        // Get all beverages
        for (const beverage of detailsOrders[3]) {
          if (beverage.idOrders === user.idOrders) {
            beverageList.push(beverage);
          }
        }

        // Get all desserts
        for (const dessert of detailsOrders[4]) {
          if (dessert.idOrders === user.idOrders) {
            dessertList.push(dessert);
          }
        }

        // Get all menuPizzas
        for (const menuPizz of detailsOrders[5]) {
          if (menuPizz.idOrders === user.idOrders) {
            menuPizzList.push(menuPizz);
          }
        }

        // Get all saladsComposed
        for (const saladsComposed of detailsOrders[6]) {
          if (saladsComposed.idOrders === user.idOrders) {

            const basesDetailsOrders = this.createBaseOrderDetail(saladsComposed);
            const ingredientDetailsOrders = this.createIngredientsOrderDetail(saladsComposed);
            const toppingsDetailsOrders = this.createToppingsOrderDetail(saladsComposed);

            // Check if there is a sauce or not in salad to display message in template if there isn't sauce
            if (saladsComposed.saladsSaucesName === null) {
              saladsComposed.saladsSaucesName = 'Pas de sauce sélectionnée pour cette salade';
            }

            const saladsComposedDetail = new OrderSaladsAdmin(
              saladsComposed.idOrders,
              basesDetailsOrders,
              ingredientDetailsOrders,
              toppingsDetailsOrders,
              saladsComposed.saladsSaucesName,
              saladsComposed.saladsComposedPrice,
              saladsComposed.saladsComposedQuantity
            );
            saladsComposedList.push(saladsComposedDetail);
          }
        }

        // Get all menuSaladsComposed
        for (const menuSaladsComposed of detailsOrders[7]) {
          if (menuSaladsComposed.idOrders === user.idOrders) {

            menuSaladsComposed.bases = this.createBaseOrderDetail(menuSaladsComposed);
            menuSaladsComposed.ingredients = this.createIngredientsOrderDetail(menuSaladsComposed);
            menuSaladsComposed.toppings = this.createToppingsOrderDetail(menuSaladsComposed);
            menuSaladsComposedList.push(menuSaladsComposed);

            if (menuSaladsComposed.bevName === null) {
              menuSaladsComposed.bevName = 'Pas de boisson sélectionnée dans ce menu';
            }

            if (menuSaladsComposed.dessName === null) {
              menuSaladsComposed.dessName = 'Pas de dessert sélectionné dans ce menu';
            }

            if (menuSaladsComposed.saladsSaucesName === null) {
              menuSaladsComposed.saladsSaucesName = 'Pas de sauce sélectionnée pour cette salade';
            }

            // To display price with 2 numbers after coma
            menuSaladsComposed.menuSaladPrice = menuSaladsComposed.menuSaladPrice.toFixed(2);
          }
        }

        // Create instance of new OrdersDetailsAdmin
        const ordersDetails = new OrdersDetailsAdmin(
          user.idOrders,
          user.dateOrder,
          user.orderPrice.toFixed(2),
          user.lastname,
          user.firstname,
          user.mail,
          user.phoneNumber,
          user.userAddressFacturation,
          user.deliveryAddress,
          user.userMessage,
          pizzaList,
          saladsComposedList,
          beverageList,
          dessertList,
          menuPizzList,
          menuSaladsComposedList
        );
        // Push results in final results Array
        this.listOfOrders.push(ordersDetails);
      }
    });
  }

  // Create base array with name and quantity separate to better display them in template
  createBaseOrderDetail(saladsComposed: any) {
    const basesDetailsOrdersList: Array<object> = []; // final result
    let { bases } = saladsComposed; // Get data we need to split them

    // Check if bases is null to avoid error (split of null make error)
    if (bases !== null) {
      bases = bases.split(',').join(' ').split(' '); // Separation of data
      let nameBase = '';

      for (let i = 0; i < bases.length; i ++) {
        // check if value is a number
        if (isNaN(bases[i])) {
          nameBase += bases[i];
          if (isNaN(bases[i + 1])) {
            nameBase += ' ';
          }
        } else {
          // Create base object to push it in final result array
          const baseDetailOrder = {
            baseName: nameBase,
            baseQuantity: Number.parseInt(bases[i], 10)
          };
          basesDetailsOrdersList.push(baseDetailOrder);
          // empty variable for next iteration
          nameBase = '';
        }
      }
      return basesDetailsOrdersList;
    }
  }

  createIngredientsOrderDetail(saladsComposed: any) {
    const ingredientsDetailsOrdersList: Array<object> = []; // final result
    let { ingredients } = saladsComposed; // Get data we need to split them

    if (ingredients !== null) {
      ingredients = ingredients.split(',').join(' ').split(' '); // Separation of data
      let nameIngredients = '';

      for (let i = 0; i < ingredients.length; i ++) {
        // check if value is a number
        if (isNaN(ingredients[i])) {
          nameIngredients += ingredients[i];
          if (isNaN(ingredients[i + 1])) {
            nameIngredients += ' ';
          }
        } else {
          // Create ingredient object to push it in final result array
          const ingredientDetailOrder = {
            ingredientName: nameIngredients,
            ingredientQuantity: Number.parseInt(ingredients[i], 10)
          };
          ingredientsDetailsOrdersList.push(ingredientDetailOrder);
          // empty variable for next iteration
          nameIngredients = '';
        }
      }
      return ingredientsDetailsOrdersList;
    }
  }

  createToppingsOrderDetail(saladsComposed: any) {
    const toppingsDetailsOrdersList: Array<object> = []; // final result
    let { toppings } = saladsComposed; // Get data we need to split them

    if (toppings !== null) {
      toppings = toppings.split(',').join(' ').split(' '); // Separation of data
      let nameToppings = '';

      for (let i = 0; i < toppings.length; i ++) {
        // check if value is a number
        if (isNaN(toppings[i])) {
          nameToppings += toppings[i];
          if (isNaN(toppings[i + 1])) {
            nameToppings += ' ';
          }
        } else {
            // Create ingredient object to push it in final result array
            const toppingsDetailOrder = {
            toppingName: nameToppings,
            toppingQuantity: Number.parseInt(toppings[i], 10)
          };
            toppingsDetailsOrdersList.push(toppingsDetailOrder);
            // empty variable for next iteration
            nameToppings = '';
          }
      }
      return toppingsDetailsOrdersList;
    }
  }

}
