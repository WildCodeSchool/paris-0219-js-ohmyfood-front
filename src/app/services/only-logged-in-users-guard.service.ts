import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuardService implements CanActivate {
  tokenGuard;
  alreadyLogged;

  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('token') != undefined && sessionStorage.getItem('alreadyLogged') != undefined) {
      if (sessionStorage.getItem('alreadyLogged') == this.tokenGuard) {
        return true
      }
    } else if (sessionStorage.getItem('token') != undefined && sessionStorage.getItem('alreadyLogged') == undefined) {
      if (sessionStorage.getItem('token') == this.tokenGuard) {
        sessionStorage.setItem('alreadyLogged', this.tokenGuard)
        return true
      }
    } else { 
      this.router.navigateByUrl('authClientPage');
      window.alert("Connectez-vous pour avoir accès aux commandes en ligne");
      return false
    }
  }
}
