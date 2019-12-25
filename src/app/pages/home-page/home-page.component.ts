import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  booleanLoggedHome = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    if (localStorage.getItem('userLastName') != undefined) { //on page refresh with logged user
      this.booleanLoggedHome = true;
    }

    this.loginService.transfertUser.subscribe(_ => { // on client logged
      this.booleanLoggedHome = true;
    })
  }
}
