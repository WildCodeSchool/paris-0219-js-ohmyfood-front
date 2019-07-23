import { Component } from '@angular/core';

@Component({
  selector: 'app-user-account-manage',
  templateUrl: './user-account-manage.component.html',
  styleUrls: ['./user-account-manage.component.scss']
})
export class UserAccountManageComponent  {
  textChoice = ['Accéder à votre Compte','Modifier vos informations personnelles', 'Modifier vos adresses'];
  arrayChoice = ['infoUser', 'modifyInfoUser', 'modifyInfoUserAddress'];
  action = 'infoUser';

  getChoiceAction(index) {
    this.action = this.arrayChoice[index]
  }
}
