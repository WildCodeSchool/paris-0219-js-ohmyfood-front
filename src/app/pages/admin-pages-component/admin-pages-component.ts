import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss']
})
export class AdminPagesComponent implements OnInit {

  forms = true;
  ordersDetails: boolean;
  ordersArchived: boolean;

  constructor() { }

  ngOnInit() {
  }

  changeComponent(componentToDisplay: string) {
    switch (componentToDisplay) {
      case 'forms':
        this.forms = true;
        this.ordersDetails = false;
        this.ordersArchived = false;
        break;

      case 'ordersDetails':
        this.forms = false;
        this.ordersDetails = true;
        this.ordersArchived = false;
        break;

      case 'ordersArchived':
        this.forms = false;
        this.ordersDetails = false;
        this.ordersArchived = true;
        break;
      default: null;
    }
  }

}
