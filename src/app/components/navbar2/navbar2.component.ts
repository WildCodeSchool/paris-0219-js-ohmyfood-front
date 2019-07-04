import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  booleanAdminLogged = 0;

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem('userLastName') != undefined) { //on page refresh with logged user
      this.userInfoObject = {
        lastname: sessionStorage.getItem('userLastName'),
        firstname: sessionStorage.getItem('userFirstName'),
        mail: sessionStorage.getItem('userMail')
      };
    }

    this.loginService.transfertUserRight.subscribe(_ => {
      this.booleanAdminLogged = 1;
    })

    this.loginService.transfertUser.subscribe(_ => { // on client logged
      this.userInfoObject = {
        lastname: sessionStorage.getItem('userLastName'),
        firstname: sessionStorage.getItem('userFirstName'),
        mail: sessionStorage.getItem('userMail')
      };
    })
  }

  checkIfUserLogged() {
    if (sessionStorage.getItem('userLastName') == undefined) {
      this.router.navigateByUrl('authClientPage');
    } else {
      this.router.navigateByUrl('homeOrderPage');
    }
  }

  logOut() {
    this.loginService.booleanLoggedIn = 0;
    this.booleanAdminLogged = 0;
    sessionStorage.clear();
    this.userInfoObject = {
      lastname: '',
      firstname: '', 
      mail: ''
    }
    
    if (this.route.snapshot._routerState.url === "/homePage") {
      window.location.reload()
    }
    this.router.navigateByUrl('/');
  }
}

