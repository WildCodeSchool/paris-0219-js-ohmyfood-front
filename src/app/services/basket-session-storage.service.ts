import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketSessionStorageService {

  constructor() { }

  saveToLocalStorage(reset: string, form) {
    sessionStorage.setItem('beverages', JSON.stringify(form.map(
      (bev: Array<object>) => bev)
      )
    );
    if (reset === 'reset') {
    sessionStorage.removeItem('beverages');
  }
}
}
