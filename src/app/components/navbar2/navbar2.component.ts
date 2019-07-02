import { Component, OnInit, SimpleChange } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss']
})
export class Navbar2Component {
  userInfoObject = {
    lastname: '',
    firstname: '', 
    mail: ''
  }
  userInfoGet: boolean = false;

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('userLastName') != undefined) { //on page refresh with logged user
      this.userInfoObject = {
        lastname: localStorage.getItem('userLastName'),
        firstname: localStorage.getItem('userFirstName'),
        mail: localStorage.getItem('userMail')
      };
    }
    this.loginService.transfertUser.subscribe(_ => { // on client logged
      this.userInfoObject = {
        lastname: localStorage.getItem('userLastName'),
        firstname: localStorage.getItem('userFirstName'),
        mail: localStorage.getItem('userMail')
      };
    })
  }
}

