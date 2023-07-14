import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogRegComponent } from './components/forms/log-reg/log-reg.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductCardComponent } from './components/home/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthInterceptor } from './auth.interceptor';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AddressFormComponent } from './components/check-out/address-form/address-form.component';
import { checkoutGuard } from './components/guard/checkout.guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    LogRegComponent,
    ErrorComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckOutComponent,
    AddressFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  },
  checkoutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
