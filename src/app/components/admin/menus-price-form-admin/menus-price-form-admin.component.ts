import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenusPriceService } from 'src/app/services/menus-price.service';

@Component({
  selector: 'app-menus-price-form-admin',
  templateUrl: './menus-price-form-admin.component.html',
  styleUrls: ['./menus-price-form-admin.component.scss']
})
export class MenusPriceFormAdminComponent implements OnInit {

  actions = ['Modifier'];
  formCheck: FormGroup;
  regexTax = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  menusPriceFormObject;
  menusPriceFormPut: FormGroup;
  tabStr = [];
  valueAction = 'Modifier';

  constructor(
    private menuService: MenusPriceService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    const getMenusPriceObs = this.menuService.getMenusPriceType().subscribe(data => {
      this.menusPriceFormObject = data;
      getMenusPriceObs.unsubscribe();
    });
  }

  get FM () { return this.menusPriceFormPut.controls; }

  initForm() {
    this.menusPriceFormPut = this.fb.group({
      menuPrice: ['menuPizzPrice','menuSaladPriceOr', 'menuSaladPriceAnd', [Validators.required]],
    });
  }

  onSubmitPutForm() {
    if (this.menusPriceFormPut.valid) {
      this.menuService.menusPriceFormObject = {
        menuPizzPrice: this.menusPriceFormPut.value.menuPrice,
        menuSaladPriceOr: this.menusPriceFormPut.value.menuPrice,
        menuSaladPriceAnd: this.menusPriceFormPut.value.menuPrice
      };
      if (confirm(`Êtes-vous certain de modifier le menu ${this.menusPriceFormPut.value.menuPizzPrice}`)) {
        const putMenuType = this.menuService.putMenusPriceType().subscribe(_ => {
          const getMenusPriceObs = this.menuService.getMenusPriceType().subscribe(data => {
            this.menusPriceFormObject = data;
            getMenusPriceObs.unsubscribe();
          })
          this.menusPriceFormPut.reset();
          putMenuType.unsubscribe();
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
