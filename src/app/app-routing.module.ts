import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogRegComponent } from './components/forms/log-reg/log-reg.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { checkoutGuard } from './components/guard/checkout.guard';
import { ProfiledataComponent } from './components/profiledata/profiledata.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo : '/home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent},
  { path: 'profile', component: ProfileComponent, children :[
    { path : 'profiledata', component: ProfiledataComponent },
    { path : 'orders', component : OrdersComponent }
  ]},
  { path: 'log-reg', component : LogRegComponent},
  { path: 'product/:id', component:ProductDetailsComponent  },
  { path: 'cart', component:CartComponent },
  { path: 'checkout', component:CheckOutComponent, canActivate:[checkoutGuard] },
  { path: '**', component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
