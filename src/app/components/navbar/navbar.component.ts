import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('navBurger', {static: true}) navBurger: ElementRef<any>;
  @ViewChild('navMenu', {static: true}) navMenu: ElementRef<any>;

  toggleNavbar() {
      this.navBurger.nativeElement.classList.toggle('is-active');
      this.navMenu.nativeElement.classList.toggle('is-active');
  }

}