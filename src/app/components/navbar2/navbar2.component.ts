import { Component, OnInit, SimpleChange } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss']
})
export class Navbar2Component {
  userInfoObject: Object;

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.transfertUser.subscribe(data => {
      this.userInfoObject = {
        lastname: data.lastname,
        firstname: data.firstname,
        mail: data.mail
      };
    })
  }
}

