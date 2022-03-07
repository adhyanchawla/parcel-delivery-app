import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  //creation of form
  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  isFormValid = false;
  areCredentialsInvalid = false;

 
  onRegister() {
    if (!this.signupForm.valid) {
      return;
    }

    const registerService = this.authenticationService;
    registerService
      .registerUser({
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      })
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('login');
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          
        },
      });
      this.signupForm.reset();
  }
 
  // on clicking signup button
  // signup(): void {
  //   //checks whether form is valid
  //   // if (!this.signupForm.valid) {
  //   //   this.isFormValid = true;
  //   //   this.areCredentialsInvalid = false;
  //   //   return;
  //   // } else if(!this.authenticationService.authenticate()) {
  //   //   this.isFormValid = false;
  //   //   this.areCredentialsInvalid = true;
  //   // }
  //   //this.checkCredentials(this.signupForm);
  //   this.authenticationService
  //     .signup(this.signupForm.value)
  //     .subscribe((msg) => {
  //       console.log(msg);
  //       this.router.navigateByUrl('login');
  //     });
  // }
}
