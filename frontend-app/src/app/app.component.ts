import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-app';
  token: any;
  constructor(public authenticationService: AuthenticationService, public loginService: LoginService) {
    this.token = localStorage.getItem("token");
   }
}
