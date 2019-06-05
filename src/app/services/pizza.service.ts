import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  pizzaFormObject;
  url = "routes_pizzas/pizzas";
  constructor(private http: HttpClient) { }

  addPizzaType() {
    return this.http.post(this.url, this.pizzaFormObject);
   }
}
