import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzasDataService {

  pizzasRoute: 'http://localhost:3000/pizzas';

  constructor(private http: HttpClient) { }

  getPizzas(): Observable<object> {
    return this.http.get(this.pizzasRoute);
  }

}
