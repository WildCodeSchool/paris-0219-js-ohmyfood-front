import { Component, OnInit } from '@angular/core';
import { OrderPizzas } from 'src/app/class/order-pizzas';
import { OrderBeverage } from 'src/app/class/order-beverage';
import { OrderDessert } from 'src/app/class/order-dessert';
import { FinalOrder } from 'src/app/class/final-order';
import { FinalOrderService } from 'src/app/services/final-order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAccountInformationsService } from 'src/app/services/user-account-informations.service';
import { DatePipe } from '@angular/common';
import { checkLocationDelivery } from '../../validators/CheckLocationDelivery';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss'],
  providers: [DatePipe]
})
export class DetailOrderComponent implements OnInit {

  orderStatus: 'Livraison';
  enableSubmit: boolean;

  userPizzaChoice: Array<OrderPizzas>; // Get data from service
  userBeveragesChoice: Array<OrderBeverage>;
  userDessertsChoice: Array<OrderDessert>;

  finalOrderRecap: FinalOrder;

  date: Date = new Date();

  dateOrder: string;

  initPrice: boolean;

  totalOrder: number; // final result

  userDetailForm: FormGroup;

  constructor(
    private finalOrderService: FinalOrderService,
    private fb: FormBuilder,
    private userAccountInformationsService: UserAccountInformationsService,
    private datePipe: DatePipe
  ) { this.dateOrder = this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'); }

  ngOnInit() {
    this.initForm();
    this.userAccountInformationsService.userMail = sessionStorage.getItem('userMail');
    this.userAccountInformationsService.getClientAccountInfos().then(res => {
      const userAccountObject = JSON.parse(res);
      this.userDetailForm.patchValue({
        mailUser: sessionStorage.getItem('userMail'),
        livrAddress1 : userAccountObject['1'].userAddress1,
        livrAddress2 : userAccountObject['1'].userAddress2,
        zipcode : userAccountObject['1'].zipcode,
        city: userAccountObject['1'].city,
        factAddress: `${userAccountObject['1'].userAddress1} ` +
        `${userAccountObject['1'].userAddress2} ${userAccountObject['1'].zipcode} ${userAccountObject['1'].city}`
      });
    });
    // Get item from session storage if there is something in it
    if (sessionStorage.getItem('finalOrder')) {
      this.finalOrderRecap = JSON.parse(sessionStorage.getItem('finalOrder'));
    }

    // Subscribe to output from basket component
    const finalOrderSubscription = this.finalOrderService.getFinalOrder.subscribe((userFinalOrder: any) => {
      let finalOrderStorage: any;

      sessionStorage.getItem('finalOrder') ?
      finalOrderStorage = JSON.parse(sessionStorage.getItem('finalOrder')) :
      sessionStorage.setItem('finalOrder', JSON.stringify(userFinalOrder));

      // Initialize variables to sort duplicate data
      const pizza = userFinalOrder.pizza;
      const salad = userFinalOrder.salad;
      const beverage = userFinalOrder.beverage;
      const dessert = userFinalOrder.dessert;
      const menuPizza = userFinalOrder.menuPizza;
      const menuSalad = userFinalOrder.menuSalad;

      // For each key, group information to sort them behind
      if (finalOrderStorage !== undefined) {
        finalOrderStorage.salad.map((salads: any) => {
          salad.push(salads);
        });
      }

      if (finalOrderStorage !== undefined) {
        finalOrderStorage.pizza.map((pizzas: any) => {
          pizza.push(pizzas);
        });
      }

      if (finalOrderStorage !== undefined) {
        finalOrderStorage.beverage.map((beverages: any) => {
          beverage.push(beverages);
        });
      }

      if (finalOrderStorage !== undefined) {
        finalOrderStorage.dessert.map((desserts: any) => {
          dessert.push(desserts);
        });
      }

      if (finalOrderStorage !== undefined) {
        finalOrderStorage.menuPizza.map((menusPizza: any) => {
          menuPizza.push(menusPizza);
        });
      }

      if (finalOrderStorage !== undefined) {
        finalOrderStorage.menuSalad.map((menusSalad: any) => {
          menuSalad.push(menusSalad);
        });
      }

      // Sort array to avoid duplicate
      for (let i = 0; i < pizza.length; i ++ ) {
        for (let j = i + 1; j < pizza.length; j ++) {
          if (pizza[i].pizzName === pizza[j].pizzName) {
            pizza[i].pizzQuantity += pizza[j].pizzQuantity;
            pizza[i].pizzPriceTotal += (pizza[j].pizzPriceTotal).toFixed(2);
            pizza.splice(j, 1);
          }
        }
      }

      for (let i = 0; i < beverage.length; i ++ ) {
        for (let j = i + 1; j < beverage.length; j ++) {
          if (beverage[i].bevName === beverage[j].bevName) {
            beverage[i].bevQuantity += beverage[j].bevQuantity;
            beverage[i].bevPriceTotal += (beverage[j].bevPriceTotal).toFixed(2);
            beverage.splice(j, 1);
          }
        }
      }

      for (let i = 0; i < dessert.length; i ++ ) {
        for (let j = i + 1; j < dessert.length; j ++) {
          if (dessert[i].dessName === dessert[j].dessName) {
            dessert[i].dessQuantity += dessert[j].dessQuantity;
            dessert[i].dessPriceTotal += (dessert[j].dessPriceTotal).toFixed(2);
            dessert.splice(j, 1);
          }
        }
      }

      // Get good values
      this.finalOrderRecap = new FinalOrder(
          pizza,
          salad,
          beverage,
          dessert,
          menuPizza,
          menuSalad
        );

      sessionStorage.setItem('finalOrder', JSON.stringify(this.finalOrderRecap)); // Save new finalOrder in session storage
      this.calcTotalOrder();
      finalOrderSubscription.unsubscribe();
    });
    this.calcTotalOrder();
  }

  // html gestion

  quantitySelect(operator: string, i: number, quantity: number, elType: string) {
    let abrevElType = '';
    switch (elType) {
      case 'pizza':
        abrevElType = 'pizz';
        break;
      case 'beverage':
        abrevElType = 'bev';
        break;
      case 'dessert':
        abrevElType = 'dess';
        break;
      case 'salad':
        abrevElType = 'saladsComposed';
        break;
      case 'menuPizza':
        abrevElType = 'menuPizz';
        break;
      case 'menuSalad':
        abrevElType = 'menuSalad';
        break;
      default: null;
               break;
    }

    const abrevElTypeQtt = abrevElType + 'Quantity';

    const abrevElTypeTotPrice = abrevElType + 'PriceTotal';

    const elementPrice = this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeTotPrice}`] / quantity;

    if (operator === '+') {
      this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeQtt}`] += 1;
      this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeTotPrice}`] = (elementPrice * (quantity + 1)).toFixed(2);
    }
    if (operator === '-') {
      if (quantity > 1) {
        this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeQtt}`] -= 1;
        this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElTypeTotPrice}`] = (elementPrice * (quantity - 1)).toFixed(2);
      } else {
        let speechConfirm = `Etes-vous sûr de vouloir supprimer `;
        if (elType === 'salad') {
          speechConfirm += `la salad n° ${i + 1}?`;
        } else if (elType === 'menuPizza') {
          speechConfirm += `le menu pizza n° ${i + 1}?`;
        } else if (elType === 'menuSalad') {
          speechConfirm += `le menu salade n° ${i + 1}?`;
        } else {
          speechConfirm += `${this.finalOrderRecap[`${elType}`][`${i}`][`${abrevElType}Name`]}?`;
        }

        if (confirm(speechConfirm)) {
          this.finalOrderRecap[`${elType}`].splice(i, 1);
        }
      }
    }
    sessionStorage.setItem('finalOrder', JSON.stringify(this.finalOrderRecap));
    this.calcTotalOrder();
  }

  initForm() {
    this.userDetailForm = this.fb.group({
      mailUser: [sessionStorage.getItem('userMail')],
      livrAddress1 : ['', Validators.required],
      livrAddress2 : ['', Validators.required],
      zipcode : ['', Validators.required],
      city: [''],
      factAddress: [''],
      comment: [''],
      deliveryOrTakeAway: ['À emporter']
    },
    {
      validators: checkLocationDelivery('deliveryOrTakeAway', 'zipcode')
    });
  }

  calcTotalOrder() {
    const arrayTotalOrderPrice = [];
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

    this.finalOrderRecap[`pizza`].map(pizz => { arrayTotalOrderPrice.push(+pizz[`pizzPriceTotal`]); });
    this.finalOrderRecap[`beverage`].map(bev => { arrayTotalOrderPrice.push(+bev[`bevPriceTotal`]); });
    this.finalOrderRecap[`dessert`].map(dess => { arrayTotalOrderPrice.push(+dess[`dessPriceTotal`]); });
    this.finalOrderRecap[`salad`].map(salad => { arrayTotalOrderPrice.push(+salad[`saladsComposedPriceTotal`]); });
    this.finalOrderRecap[`menuPizza`].map(menuPizz => { arrayTotalOrderPrice.push(+menuPizz[`menuPizzPriceTotal`]); });
    this.finalOrderRecap[`menuSalad`].map(menuSalad => { arrayTotalOrderPrice.push(+menuSalad[`menuSaladPriceTotal`]); });
    this.totalOrder = arrayTotalOrderPrice.reduce(reducer).toFixed(2);
  }

  confirmOrder() {
    const finalOrder = {
      0: this.finalOrderRecap,
      1: this.userDetailForm.value,
      2: {
        dateOrder: this.dateOrder,
        priceOrder: this.totalOrder,
        idUsers: ''
      }
    };
    this.finalOrderService.finalOrderObject = finalOrder;
    this.finalOrderService.submitFinalOrder().then(res => {
    });
  }
}

