import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminSuperGuardService implements CanActivate {
  tokenGuard = '';
  constructor() {  }
  canActivate(): boolean {
      
      if (sessionStorage.getItem('token') != undefined) {
        if (sessionStorage.getItem('token') == this.tokenGuard) {
          console.log('ouiii');
          return true
        }
      } else {
        console.log('nonnn')
        return false
      }
  }
  
}
