import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { DessertsComponent } from './components/desserts/desserts.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DessertsDataService } from './services/desserts-data.service';


@NgModule({
  declarations: [
    AppComponent,
    DessertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    DessertsDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
