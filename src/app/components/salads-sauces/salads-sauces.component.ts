import { Component, OnInit } from '@angular/core';
import { SaladsDatasService } from '../../services/salads-datas.service';
import {  FormBuilder, FormArray, FormGroup, FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-salads-sauces',
  templateUrl: './salads-sauces.component.html',
  styleUrls: ['./salads-sauces.component.scss']
})
export class SaladsSaucesComponent implements OnInit {
  saladsSaucesFormTable;

  // reactive form

  saladsSaucesForm: FormGroup;


  constructor(
    private saladsDatasService: SaladsDatasService,
    private fb: FormBuilder
  ) {
    this.saladsSaucesForm = this.fb.group({
      selectSauces: ''
      });

    }

    ngOnInit() {
      this.saladsDatasService.addSaladsSauces().subscribe(data => {
        this.saladsSaucesFormTable = data;
      });
}


    onSubmit() {
    const orderSauces = this.saladsSaucesForm.value;
    }
}
