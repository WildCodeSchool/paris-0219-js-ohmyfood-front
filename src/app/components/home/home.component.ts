import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  buttons = ['livraison', 'a emporter'];
  constructor(private router: Router) { }

  checkIfUserLogged(i) {
    let index = i;
    if (localStorage.getItem('userLastName') == undefined) {
      return this.router.navigateByUrl('authClientPage')
    }
    if (index === 0) {
      // variable en livraison checked
    } else {
      // variable à emporter checked
    }
    this.router.navigateByUrl('homeOrderPage')
  }

}
