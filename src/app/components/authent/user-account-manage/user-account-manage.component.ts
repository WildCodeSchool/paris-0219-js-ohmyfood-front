import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { checkUserPassword } from 'src/app/validators/checkUserPassword';
import { UserAccountInformationsService } from 'src/app/services/user-account-informations.service';

@Component({
  selector: 'app-user-account-manage',
  templateUrl: './user-account-manage.component.html',
  styleUrls: ['./user-account-manage.component.scss']
})
export class UserAccountManageComponent  {

}
