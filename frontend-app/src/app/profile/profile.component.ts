import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;
  addressForm: FormGroup;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (res) => {
        this.userData = res.body.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  address() {

  }

  openModal() {

  }

}
