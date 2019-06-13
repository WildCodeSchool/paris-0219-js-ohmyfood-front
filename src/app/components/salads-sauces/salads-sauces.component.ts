import { Component, OnInit } from '@angular/core';
import { TransfertDatasService } from 'src/app/services/transfert-datas.service';
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
    private transfertDatasService: TransfertDatasService,
    private fb: FormBuilder
  ) {
    this.saladsSaucesForm = this.fb.group({
      selectSauces: ''
      });

    }

    ngOnInit() {
      this.transfertDatasService.addSaladsSauces().subscribe(data => {
        this.saladsSaucesFormTable = data;
        console.log(this.saladsSaucesFormTable);

      });
}


    onSubmit() {
    const orderSauces = this.saladsSaucesForm.value;
    console.log(orderSauces);

    }
}
