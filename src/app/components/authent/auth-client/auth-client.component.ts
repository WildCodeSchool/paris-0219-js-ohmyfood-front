import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-auth-client',
  templateUrl: './auth-client.component.html',
  styleUrls: ['./auth-client.component.scss']
})
export class AuthClientComponent implements OnInit {
  authClientForm: FormGroup;

  constructor(private fb: FormBuilder, private loginCheck: LoginService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authClientForm = this.fb.group({
      emailClient: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      psswClient: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    })
  }
}
