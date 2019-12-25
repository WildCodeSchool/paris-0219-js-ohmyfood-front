import { Component, OnInit } from '@angular/core';
import { UserAccountInformationsService } from 'src/app/services/user-account-informations.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  userAccountObject;

  constructor(
    private userAccountInformationsService: UserAccountInformationsService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('userMail') !== undefined) {
      this.userAccountInformationsService.userMail = localStorage.getItem('userMail');
      this.userAccountInformationsService.getClientAccountInfos().then(res => {
        this.userAccountObject = JSON.parse(res);
      })
    }
  }

}
