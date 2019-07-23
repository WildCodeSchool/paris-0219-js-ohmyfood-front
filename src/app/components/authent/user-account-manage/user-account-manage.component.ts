import { Component } from '@angular/core';
import { UserAccountInformationsService } from 'src/app/services/user-account-informations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account-manage',
  templateUrl: './user-account-manage.component.html',
  styleUrls: ['./user-account-manage.component.scss']
})
export class UserAccountManageComponent  {
  textChoice = ['Accéder à votre Compte','Modifier vos informations personnelles', 'Modifier vos adresses'];
  arrayChoice = ['infoUser', 'modifyInfoUser', 'modifyInfoUserAddress'];
  action = 'infoUser';

  constructor(
    private router: Router,
    private userAccountInformationsService: UserAccountInformationsService
  ) { }
  getChoiceAction(index) {
    this.action = this.arrayChoice[index]
  }

  deleteAccount() {
    if (confirm(`ATTENTION ! 
      Vous vous apprêtez à supprimer intégralement votre compte, ainsi que toutes vos informations personnelles.`
    )) {
      this.userAccountInformationsService.delClientAccount().then(_ => {
        localStorage.clear();
        this.router.navigateByUrl('/homePage');
        alert("Merci d'avoir effectué vos commandes chez OhMyFood!");
        window.location.reload();
      })
    }
  }
}
