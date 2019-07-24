import { Component, OnInit } from '@angular/core';
import { OrdersDetailsAdmin } from 'src/app/class/orders-details-admin';
import { OrdersDetailsAdminService } from 'src/app/services/orders-details-admin.service';
import { OrderSaladsAdmin } from 'src/app/class/order-salads-admin';

@Component({
  selector: 'app-details-orders-archived-admin',
  templateUrl: './details-orders-archived-admin.component.html',
  styleUrls: ['./details-orders-archived-admin.component.scss']
})
export class DetailsOrdersArchivedAdminComponent implements OnInit {

  // List who regroup all orders from database to display it in template
  listOfOrdersArchived: OrdersDetailsAdmin[] = [];

  constructor(private ordersAdminService: OrdersDetailsAdminService) { }

  ngOnInit() {
    // Get all details order from database
    this.ordersAdminService.getDetailsOrdersArchivedAdmin()
    .subscribe(detailsOrderArchived => {

      // Make loop to regroup all informations of each orders
      for (const user of detailsOrderArchived[0] ) {
        const pizzaList = [];
        const beverageList = [];
        const dessertList = [];
        const menuPizzList = [];
        const saladsComposedList = [];
        const menuSaladsComposedList = [];

        // Get all pizzas
        for (const pizza of detailsOrderArchived[2]) {
          if (pizza.idOrders === user.idOrders) {
            pizzaList.push(pizza);
          }
        }

        // Get all beverages
        for (const beverage of detailsOrderArchived[3]) {
          if (beverage.idOrders === user.idOrders) {
            beverageList.push(beverage);
          }
        }

        // Get all desserts
        for (const dessert of detailsOrderArchived[4]) {
          if (dessert.idOrders === user.idOrders) {
            dessertList.push(dessert);
          }
        }

        // Get all menuPizzas
        for (const menuPizz of detailsOrderArchived[5]) {
          if (menuPizz.idOrders === user.idOrders) {
            menuPizzList.push(menuPizz);
          }
        }

        // Get all saladsComposed
        for (const saladsComposed of detailsOrderArchived[6]) {
          if (saladsComposed.idOrders === user.idOrders) {

            const basesdetailsOrderArchived = this.ordersAdminService.createBaseOrderDetail(saladsComposed);
            const ingredientdetailsOrderArchived = this.ordersAdminService.createIngredientsOrderDetail(saladsComposed);
            const toppingsdetailsOrderArchived = this.ordersAdminService.createToppingsOrderDetail(saladsComposed);

            // Check if there is a sauce or not in salad to display message in template if there isn't sauce
            if (saladsComposed.saladsSaucesName === null) {
              saladsComposed.saladsSaucesName = 'Pas de sauce sélectionnée pour cette salade';
            }

            const saladsComposedDetail = new OrderSaladsAdmin(
              saladsComposed.idOrders,
              basesdetailsOrderArchived,
              ingredientdetailsOrderArchived,
              toppingsdetailsOrderArchived,
              saladsComposed.saladsSaucesName,
              saladsComposed.saladsComposedPrice,
              saladsComposed.saladsComposedQuantity
            );
            saladsComposedList.push(saladsComposedDetail);
          }
        }

        // Get all menuSaladsComposed
        for (const menuSaladsComposed of detailsOrderArchived[7]) {
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
        this.listOfOrdersArchived.push(ordersDetails);
      }
    });
  }

  deleteOrder(i: number) {
    // Delete method to delete orders tables in database
    this.ordersAdminService.deleteOrdersAdmin(this.listOfOrdersArchived[i]).subscribe();

    this.listOfOrdersArchived.splice(i, 1);
  }
}
