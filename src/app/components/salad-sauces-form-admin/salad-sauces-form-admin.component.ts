import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaladSaucesService } from 'src/app/services/salad-sauces.service';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';

@Component({
  selector: 'app-salad-sauces-form-admin',
  templateUrl: './salad-sauces-form-admin.component.html',
  styleUrls: ['./salad-sauces-form-admin.component.scss']
})
export class SaladSaucesFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  sauceFormObject;
  sauceDataObject;
  sauceFormAdd: FormGroup;
  sauceFormPut: FormGroup;
  sauceFormDel: FormGroup;
  tabStr = [];
  sauceAction = 'Ajouter';

  constructor(private saladSauceService: SaladSaucesService, private saladsDataService: SaladsDatasService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    const getSauceObs = this.saladsDataService.addSaladsSauces().subscribe(data => {
      this.saladsDataService = data;
      getSauceObs.unsubscribe();
    });
  }

  // convenience getter for easy access to form fields
  get fA() { return this.sauceFormAdd.controls; }

  get fM () { return this.sauceFormPut.controls; }

  get fD () { return this.sauceFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      sauceAction: ['Ajouter', Validators.required]
    })

    this.sauceFormAdd = this.fb.group({
      saucesName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
    this.sauceFormPut = this.fb.group({
      saucesName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      saucesNewName: [''],
    });
    this.sauceFormDel = this.fb.group({
      saucesName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.sauceFormAdd.valid) {
      this.saladSauceService.sauceFormObject = {
        sauceName: this.toJadenCase(this.sauceFormAdd.value.saladsSaucesName),
      };
      if (confirm(`Êtes-vous certain d'ajouter la sauce ${this.sauceFormAdd.value.saladsSaucesName} ?`)) {
        const addSauceType = this.saladSauceService.addSauceType().subscribe(_ => {
          const getSauceObs = this.saladsDataService.addSaladsSauces().subscribe(data => {
            this.sauceDataObject = data;
            getSauceObs.unsubscribe();
          });
          this.sauceFormAdd.reset();
          addSauceType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.sauceFormPut.valid) {
      this.saladSauceService.sauceFormObject = {
        sauceName: this.toJadenCase(this.sauceFormPut.value.saladsSaucesName),
      };
      if (this.sauceFormPut.value.saucesNewName !== '') {
        this.saladSauceService.sauceFormObject.saladsSaucesName += '|' + this.toJadenCase(this.sauceFormPut.value.saucesNewName)
      }
      if (confirm(`Êtes-vous certain de modifier la sauce ${this.sauceFormPut.value.saladsSaucesName} ?`)) {
        const putSauceType = this.saladSauceService.putSauceType().subscribe(_ => {
          const getSauceObs = this.saladsDataService.addSaladsSauces().subscribe(data => {
            this.sauceDataObject = data;
            getSauceObs.unsubscribe();
          })
          this.sauceFormPut.reset();
          putSauceType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.sauceFormDel.valid) {
      this.saladSauceService.sauceFormObject = {
        sauceName: this.toJadenCase(this.sauceFormDel.value.saladsSaucesName)
      };
      if (confirm(`Êtes-vous certain de supprimer la sauce ${this.sauceFormDel.value.saladsToppingsName} ?`)) {
        const delSauceType = this.saladSauceService.delSauceType().subscribe(_ => {
          const getSauceObs = this.saladsDataService.addSaladsSauces().subscribe(data => {
            this.sauceDataObject = data;
            getSauceObs.unsubscribe();
          });
          this.sauceFormDel.reset();
          delSauceType.unsubscribe();
        });
      }
    }
  }

  toJadenCase(strin) {
    this.tabStr = strin.split(' ');
    this.tabStr = this.tabStr.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return this.tabStr.join(' ');
  }
}
