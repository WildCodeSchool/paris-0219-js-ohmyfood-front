import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuardService implements CanActivate {
  
  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('userLastName') != undefined) {
      return true
    } else {
      this.router.navigateByUrl('authClientPage');
      window.alert("Connectez-vous pour avoir accès aux commandes en ligne")
      return false
    }
  }
}
