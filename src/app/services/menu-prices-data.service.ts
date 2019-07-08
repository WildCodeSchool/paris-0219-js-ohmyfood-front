import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuPricesDataService {

  menuPricesRoute = 'http://localhost:3000/menuPrices';

  constructor(private http: HttpClient) { }

  getMenuPrices(): Observable<object> {
    return this.http.get(this.menuPricesRoute);
  }
}
