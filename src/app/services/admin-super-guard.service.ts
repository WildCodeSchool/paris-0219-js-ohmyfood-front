import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminSuperGuardService implements CanActivate {
  tokenGuard;
  ifLogged;

  constructor(
    private router: Router
  ) {  }
  canActivate(): boolean {
    if (localStorage.getItem('token') != undefined && localStorage.getItem('adminToken') != undefined) {
      if (localStorage.getItem('adminToken') == this.tokenGuard) {
        return true
      }
    } else {
      this.router.navigateByUrl('authClientPage');
      window.alert("Connectez-vous pour avoir accès aux commandes en ligne")
      return false
    }
  }

}
