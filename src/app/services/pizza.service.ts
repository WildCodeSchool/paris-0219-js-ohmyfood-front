import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  pizzaFormObject;
  url = 'http://localhost:3000/pizzas';
  constructor(private http: HttpClient) { }

  addPizzaType() {
    return this.http.post(this.url, this.pizzaFormObject, { responseType: 'text' });
  }

  putPizzaType() {
    return this.http.put(this.url, this.pizzaFormObject, { responseType: 'text' });
  }

  delPizzaType() {
    return this.http.delete(this.url, this.pizzaFormObject);
  }
}
