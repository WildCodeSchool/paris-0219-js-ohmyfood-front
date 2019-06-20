import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authent-create',
  templateUrl: './authent-create.component.html',
  styleUrls: ['./authent-create.component.scss']
})
export class AuthentCreateComponent implements OnInit {
  authCreateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authCreateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    })
  }

}
