import { Component, OnInit } from '@angular/core';
import { OnlyLoggedInUsersGuardService } from 'src/app/services/only-logged-in-users-guard.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home-order-page',
  templateUrl: './home-order-page.component.html',
  styleUrls: ['./home-order-page.component.scss']
})
export class HomeOrderPageComponent implements OnInit {

  constructor( ) {}

  ngOnInit() { }
}
