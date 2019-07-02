import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  footerFunction() {
    document.body.scrollTop = 1300; // For Safari
    document.documentElement.scrollTop = 1300; // For Chrome, Firefox, IE and Opera
  }
}
