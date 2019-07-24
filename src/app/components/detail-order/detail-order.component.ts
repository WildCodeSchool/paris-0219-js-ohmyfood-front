import { Component, OnInit } from '@angular/core';
import { OrderPizzas } from 'src/app/class/order-pizzas';
import { OrderBeverage } from 'src/app/class/order-beverage';
import { OrderDessert } from 'src/app/class/order-dessert';
import { FinalOrder } from 'src/app/class/final-order';
import { FinalOrderService } from 'src/app/services/final-order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAccountInformationsService } from 'src/app/services/user-account-informations.service';
import { DatePipe } from '@angular/common';
import { checkLocationDelivery } from '../../validators/checkLocationDelivery';
import { PizzasDataService } from 'src/app/services/pizzas-data.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss'],
  providers: [DatePipe]
})
export class DetailOrderComponent implements OnInit {

  orderStatus: string;
  enableSubmit: boolean;

  userPizzaChoice: Array<OrderPizzas>; // Get data from service
  userBeveragesChoice: Array<OrderBeverage>;
  userDessertsChoice: Array<OrderDessert>;

  finalOrderRecap: FinalOrder;

  date: Date = new Date();

  dateOrder: string;

  today: string;

  initPrice: boolean;

  totalOrder: number; // final result

  userDetailForm: FormGroup;

  ohMyMardiPrice: object;

  pizzList: object;

  constructor(
    private finalOrderService: FinalOrderService,
    private fb: FormBuilder,
    private userAccountInformationsService: UserAccountInformationsService,
    private datePipe: DatePipe,
    private pizzaDataService: PizzasDataService
  ) {
      this.dateOrder = this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss');
      this.today = this.datePipe.transform(this.date, 'EEEE');
    }

  ngOnInit() {
    this.initForm();

    const pizzSubscription = this.pizzaDataService.getPizzas()
    .subscribe(pizz => {
      this.pizzList = pizz;
      pizzSubscription.unsubscribe();
    });

    if (localStorage.getItem('orderStatus') && this.finalOrderRecap !== undefined) {
      this.orderStatus = JSON.parse(localStorage.getItem('orderStatus'));

      this.orderStatus === 'toTakeAway' && this.today === 'Tuesday' ? this.orderStatus = 'à emporter' : this.orderStatus = 'en livraison';

      this.userDetailForm.controls.deliveryOrTakeAway.patchValue(this.orderStatus);
    }

    this.userAccountInformationsService.userMail = localStorage.getItem('userMail');
    this.userAccountInformationsService.getClientAccountInfos().then(res => {
      const userAccountObject = JSON.parse(res);
      this.userDetailForm.patchValue({
        mailUser: localStorage.getItem('userMail'),
        livrAddress1 : userAccountObject['1'].userAddress1,
        livrAddress2 : userAccountObject['1'].userAddress2,
        zipcode : userAccountObject['1'].zipcode,
        city: userAccountObject['1'].city,
        factAddress: `${userAccountObject['1'].userAddress1} ` +
        `${userAccountObject['1'].userAddress2} ${userAccountObject['1'].zipcode} ${userAccountObject['1'].city}`
      });
    });
    // Get item from session storage if there is something in it
    if (localStorage.getItem('finalOrder')) {
      this.finalOrderRecap = JSON.parse(localStorage.getItem('finalOrder'));
    }

    // Subscribe to output from basket component
    const finalOrderSubscription = this.finalOrderService.getFinalOrder.subscribe((userFinalOrder: any) => {
      let finalOrderStorage: any;

      console.log(userFinalOrder);

      localStorage.getItem('finalOrder') ?
      finalOrderStorage = JSON.parse(localStorage.getItem('finalOrder')) :
      localStorage.setItem('finalOrder', JSON.stringify(userFinalOrder));

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

      localStorage.setItem('finalOrder', JSON.stringify(this.finalOrderRecap)); // Save new finalOrder in session storage
      this.calcTotalOrder();

      finalOrderSubscription.unsubscribe();
    });

    // Get price for reduce if order's day is tuesday
    const tuesdayPriceSubscription = this.pizzaDataService.getOhMyMardiPrice()
    .subscribe(mardiPizzPrice => {
      this.ohMyMardiPrice = mardiPizzPrice;

      if (this.today === 'Tuesday' && this.orderStatus === 'à emporter' && this.finalOrderRecap !== undefined) {
        this.ohMyMardiPricePatchValue();

      } else if (this.finalOrderRecap !== undefined) {
        this.patchPizzPrice();
      }
      tuesdayPriceSubscription.unsubscribe();
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
    localStorage.setItem('finalOrder', JSON.stringify(this.finalOrderRecap));
    this.calcTotalOrder();
  }

  initForm() {
    let orderStatus: string;
    if (localStorage.getItem('orderStatus')) {
      orderStatus = JSON.parse(localStorage.getItem('orderStatus'));

      orderStatus === 'ToTakeAway' ? orderStatus = 'à emporter' : orderStatus = 'en livraison';

    } else {
      orderStatus = 'à emporter';
    }

    this.userDetailForm = this.fb.group({
      mailUser: [localStorage.getItem('userMail')],
      livrAddress1 : ['', Validators.required],
      livrAddress2 : ['', Validators.required],
      zipcode : ['', Validators.required],
      city: [''],
      factAddress: [''],
      comment: [''],
      deliveryOrTakeAway: orderStatus,
      totalOrder: this.totalOrder
    },
    {
      validators: checkLocationDelivery('deliveryOrTakeAway', 'zipcode', 'totalOrder')
    });
    this.orderStatus = orderStatus;
  }

  calcTotalOrder() {
    const arrayTotalOrderPrice = [];
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    let finalOrderEmpty = true;

    if (this.finalOrderRecap !== undefined) {
      if (this.finalOrderRecap.pizza.length > 0) {
        this.finalOrderRecap[`pizza`].map(pizz => { arrayTotalOrderPrice.push(+pizz[`pizzPriceTotal`]); });
        finalOrderEmpty = false;
      }

      if (this.finalOrderRecap.beverage.length > 0) {
        this.finalOrderRecap[`beverage`].map(bev => { arrayTotalOrderPrice.push(+bev[`bevPriceTotal`]); });
        finalOrderEmpty = false;
      }

      if (this.finalOrderRecap.dessert.length > 0) {
        this.finalOrderRecap[`dessert`].map(dess => { arrayTotalOrderPrice.push(+dess[`dessPriceTotal`]); });
        finalOrderEmpty = false;
      }

      if (this.finalOrderRecap.salad.length > 0) {
        this.finalOrderRecap[`salad`].map(salad => { arrayTotalOrderPrice.push(+salad[`saladsComposedPriceTotal`]); });
        finalOrderEmpty = false;
      }

      if (this.finalOrderRecap.menuPizza.length > 0) {
        this.finalOrderRecap[`menuPizza`].map(menuPizz => { arrayTotalOrderPrice.push(+menuPizz[`menuPizzPriceTotal`]); });
        finalOrderEmpty = false;
      }

      if (this.finalOrderRecap.menuSalad.length > 0) {
        this.finalOrderRecap[`menuSalad`].map(menuSalad => { arrayTotalOrderPrice.push(+menuSalad[`menuSaladPriceTotal`]); });
        finalOrderEmpty = false;
      }
    }

    if (!finalOrderEmpty && this.finalOrderRecap !== undefined) {
      this.totalOrder = arrayTotalOrderPrice.reduce(reducer).toFixed(2);
      this.userDetailForm.controls.totalOrder.patchValue(this.totalOrder);

    } else {
      this.totalOrder = 0;
      this.userDetailForm.controls.totalOrder.patchValue(this.totalOrder);
    }
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
    localStorage.removeItem('finalOrder');
  }

  // If pizzPrice are reduce
  ohMyMardiPricePatchValue() {
    for (const pizza of this.finalOrderRecap.pizza) {
      pizza[`pizzPriceTotal`] = (this.ohMyMardiPrice[0].pizzPriceReducTTC * pizza.pizzQuantity).toFixed(2);
    }
    this.calcTotalOrder();
  }

  patchPizzPrice() {
    for (const pizza of this.finalOrderRecap.pizza) {
      for (const pizz in this.pizzList) {
        if (this.pizzList.hasOwnProperty(pizz)) {
          if (pizza.pizzName === this.pizzList[pizz].pizzName) {
            pizza[`pizzPriceTotal`] = (this.pizzList[pizz].pizzPriceTTC * pizza.pizzQuantity).toFixed(2);
          }
        }
      }
    }
    this.calcTotalOrder();
  }

  getOrderStatus(orderStatus: string) {
    localStorage.setItem('orderStatus', JSON.stringify(orderStatus));

    if (orderStatus === 'toTakeAway' && this.today === 'Tuesday') {
      this.ohMyMardiPricePatchValue();
      this.orderStatus = 'à emporter';

    } else if (orderStatus === 'toTakeAway') {
      this.orderStatus = 'à emporter';

    } else {
      this.patchPizzPrice();
      this.orderStatus = ' en livraison';
    }
  }

}

