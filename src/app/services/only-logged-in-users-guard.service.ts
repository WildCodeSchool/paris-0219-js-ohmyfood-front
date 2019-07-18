import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuardService implements CanActivate {
  tokenGuard = '';
  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('token') != undefined) {
      if (sessionStorage.getItem('token') == this.tokenGuard) {
        return true
      }
    } else {
      this.router.navigateByUrl('authClientPage');
      window.alert("Connectez-vous pour avoir accès aux commandes en ligne")
      return false
    }
  }
}
