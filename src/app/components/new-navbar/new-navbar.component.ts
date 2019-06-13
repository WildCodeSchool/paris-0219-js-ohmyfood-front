import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-navbar',
  templateUrl: './new-navbar.component.html',
  styleUrls: ['./new-navbar.component.scss']
})
export class NewNavbarComponent {

  @ViewChild('navBurger', {static: true}) navBurger: ElementRef<any>;
  @ViewChild('navMenu', {static: true}) navMenu: ElementRef<any>;

  toggleNavbar() {
      this.navBurger.nativeElement.classList.toggle('is-active');
      this.navMenu.nativeElement.classList.toggle('is-active');
  }

}
