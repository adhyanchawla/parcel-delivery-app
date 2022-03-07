import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInComponent } from './home/logged-in/logged-in.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { PaymentsComponent } from './profile/payments/payments.component';
import { AddressesComponent } from './profile/addresses/addresses.component';
import { CostestimatesComponent } from './costestimates/costestimates.component';
import { MyordersComponent } from './myorders/myorders.component';
import { VerifyuserComponent } from './verifyuser/verifyuser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    OrderComponent,
    NavigationComponent,
    LoggedInComponent,
    OrdersComponent,
    PaymentsComponent,
    AddressesComponent,
    CostestimatesComponent,
    MyordersComponent,
    VerifyuserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
