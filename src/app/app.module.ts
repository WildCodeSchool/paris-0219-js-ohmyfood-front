import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { PizzaComponent } from './components/pizza/pizza.component';
import { NewNavbarComponent } from './components/new-navbar/new-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaPageComponent,
    PizzaComponent,
    NewNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
