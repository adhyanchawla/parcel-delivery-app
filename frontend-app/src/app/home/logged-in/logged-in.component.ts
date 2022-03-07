import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  //token: any;
  // assign the value of token for the navbar to become active
  constructor(private authService: AuthenticationService) {
    
   }

  ngOnInit(): void {
    // if (localStorage.getItem("userAccessToken") !== undefined) {
    //   this.token = localStorage.getItem("userAccessToken");
    // }
  }

  //on logout 
  logout() {
    //this.token = null;
    this.authService.logout();
    localStorage.clear();
  }

}
