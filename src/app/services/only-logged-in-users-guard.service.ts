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
    if (localStorage.getItem('token') != undefined && localStorage.getItem('alreadyLogged') != undefined) {
      if (localStorage.getItem('alreadyLogged') == this.tokenGuard) {
        return true
      }
    } else if (localStorage.getItem('token') != undefined) {
      if (localStorage.getItem('token') == this.tokenGuard) {
        localStorage.setItem('alreadyLogged', this.tokenGuard)
        return true
      }
    } else {
      this.router.navigateByUrl('authClientPage');
      window.alert("Connectez-vous pour avoir accès aux commandes en ligne");
      return false
    }
  }
}
