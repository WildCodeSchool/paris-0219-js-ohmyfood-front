import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCreateClientService } from 'src/app/services/auth-create-client.service';
import { fcall } from 'q';

@Component({
  selector: 'app-authent-create',
  templateUrl: './authent-create.component.html',
  styleUrls: ['./authent-create.component.scss']
})
export class AuthentCreateComponent implements OnInit {
  authCreateForm: FormGroup;
  createClientObject;
  regexPhone = /[0-9]*/gm;
  regexEmail = /^[a-zA-Z0-9.%&_~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gm
  show: boolean = false;
  psswType = "password";

  constructor(private fb: FormBuilder, private authCreateClientService: AuthCreateClientService) { }

  ngOnInit() {
    this.initForm();
  }

  get fC () { return this.authCreateForm.controls }

  initForm() {
    this.authCreateForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.pattern(this.regexEmail), Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.regexPhone)]],
      pssw: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    })
  }

  onSubmitCreateClientForm() {
    if (this.authCreateForm.valid) {
      this.authCreateClientService.createClientObject = {
        lastname: this.authCreateForm.value.lastName,
        firstname: this.authCreateForm.value.firstName,
        mail: this.authCreateForm.value.email,
        password: this.authCreateForm.value.pssw,
        phoneNumber: this.authCreateForm.value.phone,
        forgotPassword: "",
        userRight: 0
      };
      if (confirm(`Êtes-vous sûr de soumettre ces informations ?`)) {
        const addClient = this.authCreateClientService.addClient().subscribe(_ => {
          this.authCreateForm.reset();
          addClient.unsubscribe();
        });
      }
    }
  }

  showPssw(event) {
    event.preventDefault()
    if (this.psswType === "password") {
      this.psswType = "text";
      this.show = true;
    } else {
      this.psswType = "password";
      this.show = false;
    }
  }
}
