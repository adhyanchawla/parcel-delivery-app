import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  token: any;
  // token assigned
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    if (localStorage.getItem("token") !== undefined) {
      this.token = localStorage.getItem("token");
    }
   }

  ngOnInit(): void {
  }

  logout() {
    this.token = null;
    this.authenticationService.logout();
    localStorage.clear();
  }
}
