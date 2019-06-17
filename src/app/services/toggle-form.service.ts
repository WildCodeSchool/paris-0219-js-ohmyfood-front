import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleFormService {

  constructor() { }

  toggleForm(param: boolean) {
    return param = !param;
  }
}
