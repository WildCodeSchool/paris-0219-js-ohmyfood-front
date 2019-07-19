import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetOrdersDetailsAdminService {

  detailsOrdersAdminRoute = 'http://localhost:3000/confirmOrder';

  constructor(private http: HttpClient) { }

  getDetailsOrdersAdmin(): Observable<object> {
    return this.http.get(this.detailsOrdersAdminRoute);
  }
}
