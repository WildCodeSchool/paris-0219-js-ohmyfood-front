import { Component, OnInit } from '@angular/core';
import { TransfertDatasService } from 'src/app/services/transfert-datas.service';
import {  FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'app-salads-sauces',
  templateUrl: './salads-sauces.component.html',
  styleUrls: ['./salads-sauces.component.scss']
})
export class SaladsSaucesComponent implements OnInit {

  selectOptions: false;
  saladsSaucesFormTable: object;

  // reactive form

  saladsSaucesForm = this.fb.group({
  selectSauces: this.fb.array([])
  });


  constructor(
    private transfertDatas: TransfertDatasService,
    private fb: FormBuilder) { }

  ngOnInit() {
 /*    this.transfertDatas.saladsSaucesFormTable = this.saladsSaucesFormTable;
    console.log(this.transfertDatas.saladsSaucesFormTable); */
    this.transfertDatas.addSaladsSauces().subscribe(data => {
      this.saladsSaucesFormTable = data;
      console.log(this.saladsSaucesFormTable);


// tslint:disable-next-line: forin
      for (const key in this.saladsSaucesFormTable) {

        const saladsSaucesForm = this.fb.group({
          idSaladsSauces: [ this.saladsSaucesFormTable[key].idSaladsSauces],
          saladsSauceName: [this.saladsSaucesFormTable[key].saladsSauceName],
          saladsSauceChoice: [Boolean]
        });
        const selectSauces = this.saladsSaucesForm.get('selectSauces') as FormArray;
        selectSauces.push(saladsSaucesForm);
      }
    });
}





    onSubmit() {
    // this.saladsSaucesFormTable = {
    // idSaladsSauces: this.saladsSaucesForm.value.idSaladsSauces,
    // saladsSaucesName: this.saladsSaucesForm.value.fffsaladsSaucesName
    const orderSauces = this.saladsSaucesForm.value;
    console.log(orderSauces);
    }
}
