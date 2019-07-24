import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class MenuDatasService {

  saladsBaseRoute = 'http://localhost:3000/saladsBase';

  constructor(private http: HttpClient) { }

  getSalads(): Observable<object> {
    return this.http.get(this.saladsBaseRoute);
  }
}
