import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authguard.service';
import { CostestimatesComponent } from './costestimates/costestimates.component';
import { HomeComponent } from './home/home.component';
import { LoggedInComponent } from './home/logged-in/logged-in.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { MyordersComponent } from './myorders/myorders.component';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: "full" },
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent, children: [
    {path: 'loggedIn', component: LoggedInComponent, canActivate: [AuthGuardService] }
  ] },
  {path: 'signup', component: SignupComponent },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  {path: 'order', component: OrderComponent, canActivate: [AuthGuardService] },
  {path: 'costestimates', component: CostestimatesComponent, canActivate: [AuthGuardService] },
  {path: 'myorders', component: MyordersComponent, canActivate: [AuthGuardService] },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
