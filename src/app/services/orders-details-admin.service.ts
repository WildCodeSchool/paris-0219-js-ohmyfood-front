import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdersDetailsAdmin } from '../class/orders-details-admin';

@Injectable({
  providedIn: 'root'
})
export class OrdersDetailsAdminService {

  detailsOrdersAdminRoute = 'http://localhost:3000/confirmOrder';

  constructor(private http: HttpClient) { }

  getDetailsOrdersAdmin(): Observable<object> {
    return this.http.get(this.detailsOrdersAdminRoute);
  }

  archiveOrdersAdmin(orderToArchive: OrdersDetailsAdmin) {
    console.log(orderToArchive);
    return this.http.put(this.detailsOrdersAdminRoute, orderToArchive, { responseType: 'text'} );
  }
}
