import { Component, OnInit } from '@angular/core';
import { GetOrdersDetailsAdminService } from 'src/app/services/get-orders-details-admin.service';
import { OrdersDetailsAdmin } from 'src/app/class/orders-details-admin';

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
            saladsComposedList.push(saladsComposed);
          }
        }

        // Get all menuSaladsComposed
        for (const menuSaladsComposed of detailsOrders[7]) {
          if (menuSaladsComposed.idOrders === user.idOrders) {
            menuSaladsComposedList.push(menuSaladsComposed);
          }
        }

        // Create instance of new OrdersDetailsAdmin
        const ordersDetails = new OrdersDetailsAdmin(
          user.idOrders,
          user.dateOrder,
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
      console.log(this.listOfOrders);
    });
  }

}
