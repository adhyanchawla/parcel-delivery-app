import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-app';
  // token: any;
  constructor(public authenticationService: AuthenticationService) {
  }
  
  ngOnInit() : void {
    //  this.token = localStorage.getItem("userAccessToken");
   }

   isTokenPresent() {
    const token = localStorage.getItem('userAccessToken');
    if(token) {
      return true;
    } else return false;
}

}
