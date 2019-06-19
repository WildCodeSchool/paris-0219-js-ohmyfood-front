import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeverageService {

  beverageFormObject;
  url = 'http://localhost:3000/beverages';

  constructor(private http: HttpClient) { }

  addPizzaType() {
    return this.http.post(this.url, this.beverageFormObject, { responseType: 'text' });
  }
}
