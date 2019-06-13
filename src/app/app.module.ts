import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DessertsComponent } from './components/desserts/desserts.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { PizzaComponent } from './components/pizza/pizza.component';
import { SaladsSaucesComponent } from './components/salads-sauces/salads-sauces.component';
import { SaladsSaucesPageComponent } from './pages/salads-sauces-page/salads-sauces-page.component';



@NgModule({
  declarations: [
    AppComponent,
    DessertsComponent,
    PizzaPageComponent,
    PizzaComponent,
    SaladsSaucesComponent,
    SaladsSaucesPageComponent,
    PizzaComponent,
    PizzaPageComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
