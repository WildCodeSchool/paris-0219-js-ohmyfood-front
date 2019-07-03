import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeOrderPageComponent } from './pages/home-order-page/home-order-page.component';
import { AdminPagesComponent } from './pages/admin-pages/admin-pages.component';
import { AuthClientPageComponent } from './pages/authent/auth-client-page/auth-client-page.component';
import { SaladPageComponent } from './pages/salad-page/salad-page.component';
import { AuthentCreateComponent } from './components/authent/authent-create/authent-create.component';
import { OnlyLoggedInUsersGuardService } from './services/only-logged-in-users-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homePage',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminPagesComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'homePage',
    component: HomePageComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'homeOrderPage',
    component: HomeOrderPageComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'authClientPage',
    component: AuthClientPageComponent
  },
  {
    path: 'createClientPage',
    component: AuthentCreateComponent
  },
  {
    path: 'pizzaPage',
    component: PizzaPageComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'saladePage',
    component: SaladPageComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
