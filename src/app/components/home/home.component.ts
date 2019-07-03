import { SaladsDatasService } from './../../services/salads-datas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  saladsBaseList: object;

  buttons = ['livraison', 'a emporter'];

  constructor(
    private router: Router,
    private saladsDataService: SaladsDatasService
    ) { }

  ngOnInit() {
    this.saladsDataService.addSaladsBases().subscribe(bases => {
      this.saladsBaseList = bases;
      // console.log(this.saladsBaseList);
      });
  }

  checkIfUserLogged(i) {
    const index = i;
    if (localStorage.getItem('userLastName') === undefined) {
      return this.router.navigateByUrl('authClientPage');
    }
    if (index === 0) {
      // variable en livraison checked
    } else {
      // variable à emporter checked
    }
    this.router.navigateByUrl('homeOrderPage');
  }
  goToFooter() {
    return window.alert('Appeler le 000000');
  }
}
