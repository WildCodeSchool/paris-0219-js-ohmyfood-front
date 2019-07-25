import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-after-submit-order-page',
  templateUrl: './after-submit-order-page.component.html',
  styleUrls: ['./after-submit-order-page.component.scss']
})
export class AfterSubmitOrderPageComponent implements OnInit {

  thanksMessage: string;

  constructor() { }

  ngOnInit() {
    // Get order status in local storage
    if (localStorage.getItem('orderStatus')) {
      const orderStatus = JSON.parse(localStorage.getItem('orderStatus'));

      if (orderStatus === 'toTakeAway') {
        this.thanksMessage = `Merci d'avoir commandé chez OHMYFOOD ! Votre commande sera prête d'ici 30 minutes. À tout à l'heure!`;
        localStorage.removeItem('orderStatus');

      } else {
        this.thanksMessage = `Merci d'avoir commandé chez OHMYFOOD ! Vous serez livré.e d'ici 30 minutes. À tout à l'heure!`;
        localStorage.removeItem('orderStatus');
      }

      // If there isn't order status in local storage
    } else {
      this.thanksMessage = `Aucune commande n'a encore été effectuée. N'hésitez pas à créer votre compte pour comander en ligne`;
    }
  }

}
