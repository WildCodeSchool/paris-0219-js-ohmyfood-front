import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaladBasesService } from 'src/app/services/salad-bases.service';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';

@Component({
  selector: 'app-salad-base-form-admin',
  templateUrl: './salad-base-form-admin.component.html',
  styleUrls: ['./salad-base-form-admin.component.scss']
})
export class SaladBaseFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  baseFormObject;
  baseDataOject;
  baseFormAdd: FormGroup;
  baseFormPut: FormGroup;
  baseFormDel: FormGroup;
  baseAction = 'Ajouter';
  tabStr = [];

  constructor(private saladBaseService: SaladBasesService, private saladsDataService: SaladsDatasService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    const getBaseObs = this.saladsDataService.addSaladsBases().subscribe(data => {
      this.baseDataOject = data;
      getBaseObs.unsubscribe();
    });
  }

  // convenience getter for easy access to form fields
  get fA() { return this.baseFormAdd.controls; }

  get fM () { return this.baseFormPut.controls; }

  get fD () { return this.baseFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      baseAction: ['Ajouter', Validators.required]
    })

    this.baseFormAdd = this.fb.group({
      baseName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      basesPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.baseFormPut = this.fb.group({
      baseName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      baseNewName: [''],
      toppingPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.baseFormDel = this.fb.group({
      baseName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.baseFormAdd.valid) {
      this.saladBaseService.baseFormObject = {
        baseName: this.toJadenCase(this.baseFormAdd.value.saladsBaseName),
        basePriceHt: parseFloat(this.baseFormAdd.value.saladsBasePriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter la base ${this.baseFormAdd.value.saladsBaseName} ?`)) {
        const addBaseType = this.saladBaseService.addBaseType().subscribe(_ => {
          const getBaseObs = this.saladsDataService.addSaladsBases().subscribe(data => {
            this.saladBaseService = data;
            getBaseObs.unsubscribe();
          });
          this.baseFormAdd.reset();
          addBaseType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.baseFormPut.valid) {
      this.saladBaseService.baseFormObject = {
        baseName: this.toJadenCase(this.baseFormPut.value.saladsBaseName),
        idTax: 1
      };
      if (this.baseFormPut.value.baseNewName !== '') {
        this.saladBaseService.baseFormObject.saladsBaseName += '|' + this.toJadenCase(this.baseFormPut.value.baseNewName)
      }
      if (this.baseFormPut.value.saladsBasePriceHt !== '') {
        this.saladBaseService.baseFormObject.saladsBasePriceHt = parseFloat(this.baseFormPut.value.saladsBasePriceHt)
      }
      if (confirm(`Êtes-vous certain de modifier la base ${this.baseFormPut.value.saladsBaseName} ?`)) {
        const putBaseType = this.saladBaseService.putBaseType().subscribe(_ => {
          const getBaseObs = this. saladsDataService.addSaladsBases().subscribe(data => {
            this.baseDataOject = data;
            getBaseObs.unsubscribe();
          });
          this.baseFormPut.reset();
          putBaseType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.baseFormDel.valid) {
      this.saladBaseService.baseFormObject = {
        baseName: this.baseFormDel.value.saladsBaseName
      };
      if (confirm(`Êtes-vous certain de supprimer la base ${this.baseFormDel.value.saladsBaseName} ?`)) {
        const delBaseType = this.saladBaseService.delBaseType().subscribe(_ => {
          const getBaseObs = this.saladsDataService.addSaladsBases().subscribe(data => {
            this.baseDataOject = data;
            getBaseObs.unsubscribe();
          });
          this.baseFormDel.reset();
          delBaseType.unsubscribe();
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
