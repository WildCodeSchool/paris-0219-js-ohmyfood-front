import { Component, OnInit, SimpleChange } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { IsLogged } from 'src/app/services/IsLogged.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss']
})
export class Navbar2Component {
  userInfoObject: Object;
  isLogForNavbar: boolean;

  constructor(
    private loginService: LoginService,
    private isLogged: IsLogged
  ) {}

  ngOnInit() {
  }

  ngOnChange() {
    if (this.loginService.userInfoObject !== {}) {
      console.log("WWUSOHRGUGFEIHIRGBTUIBRIHIROIUERBFUGRFBU")
    }
  }
}

