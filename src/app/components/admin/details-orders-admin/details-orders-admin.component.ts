import { Component, OnInit } from '@angular/core';
import { OrdersDetailsAdminService } from 'src/app/services/orders-details-admin.service';
import { OrdersDetailsAdmin } from 'src/app/class/orders-details-admin';
import { OrderSaladsAdmin } from 'src/app/class/order-salads-admin';

@Component({
  selector: 'app-details-orders-admin',
  templateUrl: './details-orders-admin.component.html',
  styleUrls: ['./details-orders-admin.component.scss']
})
export class DetailsOrdersAdminComponent implements OnInit {

  constructor(private ordersAdminService: OrdersDetailsAdminService) { }

  // List who regroup all orders from database to display it in template
  listOfOrders: OrdersDetailsAdmin[] = [];

  ngOnInit() {
    // Get all details order from database
    this.ordersAdminService.getDetailsOrdersAdmin()
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

            const basesDetailsOrders = this.ordersAdminService.createBaseOrderDetail(saladsComposed);
            const ingredientDetailsOrders = this.ordersAdminService.createIngredientsOrderDetail(saladsComposed);
            const toppingsDetailsOrders = this.ordersAdminService.createToppingsOrderDetail(saladsComposed);

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

            menuSaladsComposed.bases = this.ordersAdminService.createBaseOrderDetail(menuSaladsComposed);
            menuSaladsComposed.ingredients = this.ordersAdminService.createIngredientsOrderDetail(menuSaladsComposed);
            menuSaladsComposed.toppings = this.ordersAdminService.createToppingsOrderDetail(menuSaladsComposed);
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
          user.orderMessage,
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

  archiveOrder(i: number) {
    // Put method to update database
    this.ordersAdminService.archiveOrdersAdmin(this.listOfOrders[i]).subscribe();

    // Remove details order from order list to do
    this.listOfOrders.splice(i, 1);
  }

}
