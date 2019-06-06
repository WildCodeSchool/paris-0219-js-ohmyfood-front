import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { PizzaComponent } from './components/pizza/pizza.component';
import { SaladsSaucesComponent } from './components/salads-sauces/salads-sauces.component';
import { SaladsSaucesPageComponent } from './pages/salads-sauces-page/salads-sauces-page.component';



@NgModule({
  declarations: [
    AppComponent,
    PizzaPageComponent,
    PizzaComponent,
    SaladsSaucesComponent,
    SaladsSaucesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
