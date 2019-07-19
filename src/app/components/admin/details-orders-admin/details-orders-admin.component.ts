import { Component, OnInit } from '@angular/core';
import { GetOrdersDetailsAdminService } from 'src/app/services/get-orders-details-admin.service';

@Component({
  selector: 'app-details-orders-admin',
  templateUrl: './details-orders-admin.component.html',
  styleUrls: ['./details-orders-admin.component.scss']
})
export class DetailsOrdersAdminComponent implements OnInit {

  constructor(private getOrdersAdminService: GetOrdersDetailsAdminService) { }

  ngOnInit() {
    this.getOrdersAdminService.getDetailsOrdersAdmin()
    .subscribe(detailsOrders => {
      console.log(detailsOrders);
    });
  }

}
