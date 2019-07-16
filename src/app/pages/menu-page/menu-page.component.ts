import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  // To display menu according to user choice
  displayMenuPizza = true;
  displayMenuSalad = false;

  constructor() { }

  ngOnInit() {
  }

  // Change boolean according to user choice
  menuChoice(userChoice: string) {
    if (userChoice === 'pizza') {
      this.displayMenuPizza = true;
      this.displayMenuSalad = false;

    } else if (userChoice === 'salad') {
      this.displayMenuPizza = false;
      this.displayMenuSalad = true;
    }
  }

}
