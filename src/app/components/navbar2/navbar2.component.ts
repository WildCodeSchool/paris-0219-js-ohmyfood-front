import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss']
})
export class Navbar2Component  {

  @ViewChild('navBurger', {static: true}) navBurger: ElementRef<any>;
  @ViewChild('navMenu', {static: true}) navMenu: ElementRef<any>;

  toggleNavbar() {
      this.navBurger.nativeElement.classList.toggle('is-active');
      this.navMenu.nativeElement.classList.toggle('is-active');
  }
}

