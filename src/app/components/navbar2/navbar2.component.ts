import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminSuperGuardService } from 'src/app/services/admin-super-guard.service';
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
  };
  ifLogged;

  booleanAdminLogged = 0;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private adminSuperGuardService: AdminSuperGuardService,
    private onlyLoggedInUsersGuardService: OnlyLoggedInUsersGuardService
  ) {  }

  ngOnInit() {

    if (localStorage.getItem('adminToken') != undefined) {
      this.loginService.routeProtection().then(res => {
        this.adminSuperGuardService.tokenGuard = res['token'];
          this.router.navigateByUrl('/admin')
      })
    }
    if (localStorage.getItem('token') != undefined) {
      const url = window.location.pathname
      this.loginService.routeProtection().then(res => {
        this.onlyLoggedInUsersGuardService.tokenGuard = res['token'];
          localStorage.setItem('alreadyLogged', res['token'])
          this.router.navigateByUrl(`${url}`)
      })
    }

    if (localStorage.getItem('userLastName') != undefined) { // on page refresh with logged user
      this.userInfoObject = {
        lastname: localStorage.getItem('userLastName'),
        firstname: localStorage.getItem('userFirstName'),
        mail: localStorage.getItem('userMail')
      };
    }

    this.loginService.transfertUserRight.subscribe(_ => {
      this.booleanAdminLogged = 1;
    });

    this.loginService.transfertUser.subscribe(_ => { // on client logged
      this.userInfoObject = {
        lastname: localStorage.getItem('userLastName'),
        firstname: localStorage.getItem('userFirstName'),
        mail: localStorage.getItem('userMail')
      };
      this.ifLogged = 'userLogged';
    });
  }

  checkIfUserLogged() {
    if (localStorage.getItem('userLastName') === undefined) {
      this.router.navigateByUrl('authClientPage');
    } else {
      this.router.navigateByUrl('homeOrderPage');
    }
  }

  logOut(event) {
    event.preventDefault()
    this.loginService.booleanLoggedIn = 0;
    this.booleanAdminLogged = 0;
    localStorage.clear();
    this.userInfoObject = {
      lastname: '',
      firstname: '',
      mail: ''
    };
    this.ifLogged = '';
    this.onlyLoggedInUsersGuardService.tokenGuard = '';
    this.adminSuperGuardService.tokenGuard = '';
    if (location.pathname === '/homePage') {
      window.location.reload();
    }
    this.router.navigateByUrl('/');
  }
}

