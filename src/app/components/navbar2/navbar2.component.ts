import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { OnlyLoggedInUsersGuardService } from 'src/app/services/only-logged-in-users-guard.service';

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

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private onlyLoggedInUsersGuardService: OnlyLoggedInUsersGuardService
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

  logOut() {
    localStorage.clear();
    this.loginService.booleanLoggedIn = false;
    this.userInfoObject = {
      lastname: '',
      firstname: '', 
      mail: ''
    }
    this.router.navigateByUrl('/');
  }
}

