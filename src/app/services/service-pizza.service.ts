import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicePizzaService {

  pizzaFormTable;
  url = "/routes_pizzas/pizzas";
  constructor(private http: HttpClient) { }

  addPizzaType(): Observable<any> {
    return this.http.post<any>(this.url, this.pizzaFormTable);
   }
}
