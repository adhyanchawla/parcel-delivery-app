import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  token: any;
  delivery: any;
  userDetailsForm: FormGroup;
  modalOpen: boolean = true;
  isVerified: boolean;
  isProfileComplete;
  userData: any;
  constructor(private authService: AuthenticationService) {}
  // phone: any;
  // city: any;
  // country: any;
  // pin: any;
  // state: any;
  // userData: any;

  ngOnInit(): void {
    //image loaded
    this.isVerified = this.authService.isVerified();
    this.isProfileComplete = this.authService.isProfileComplete();
    this.authService.getUserData().subscribe({
      next: (res) => {
        
        this.userData = res.body.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.token = localStorage.getItem("userAccessToken");
    this.userDetailsForm = this.createFormGroup();
    this.delivery =
      'https://corlettexpress.com/wp-content/uploads/2021/03/AdobeStock_132802484-scaled-1646x823.jpeg';
  }

  createFormGroup() {
    return new FormGroup({
      phone: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required, ]),
      country: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required]),
    });
  }

  onUpdate() {
    console.log(this.userDetailsForm);
    this.modalOpen = false;
    if(this.token && !localStorage.getItem("userDetails")) {
      localStorage.setItem("userDetails", this.userDetailsForm.getRawValue());
    }
  }

  updateProfile() {
    this.authService.updateUserProfile(this.userDetailsForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.ngOnInit()
      },
      error: (err) => {

        console.log(err);
      },
    });
    this.modalOpen = false;
  }

  close() {
    this.modalOpen = false;
  }
}
