import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaladToppingsService {

  toppingFormObject;
  url = 'http://localhost:3000/salads-toppings';

  constructor(private http: HttpClient) { }

  addToppingType() {
    return this.http.post(this.url, this.toppingFormObject, { responseType: 'text' });
  }

  putToppingType() {
    return this.http.put(this.url, this.toppingFormObject, { responseType: 'text'});
  }

  delToppingType() {
    return this.http.delete(`${this.url}/?saladsToppingsName=${this.toppingFormObject.saladsToppingsName}`, { responseType: 'text'});
  }
}
