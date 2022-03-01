import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  token: any;
  // assign the value of token for the navbar to become active
  constructor(private authService: AuthenticationService) {
    if (localStorage.getItem("token") !== undefined) {
      this.token = localStorage.getItem("token");
    }
   }

  ngOnInit(): void {
  }

  //on logout 
  logout() {
    this.token = null;
    this.authService.logout();
    localStorage.clear();
  }

}
