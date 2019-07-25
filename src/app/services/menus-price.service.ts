import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenusPriceService {

  menusPriceFormObject;
  url = 'http://localhost:3000/menusPrice';

  constructor(private http: HttpClient) { }

  getMenusPriceType() {
    return this.http.get(this.url);
  }

  putMenusPriceType() {
    return this.http.put(this.url, this.menusPriceFormObject, { responseType: 'text' });
  }
}
