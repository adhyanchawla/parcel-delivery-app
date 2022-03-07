// login works
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  isFormValid = false;
  areCredentialsInvalid = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    
    const loginService = this.authenticationService;
    loginService
      .authenticateUser({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (res) => {
          loginService.setJWTToken(res.body.token);
          console.log(localStorage.getItem('isVerified'));
          if(localStorage.getItem('isVerified') === "true") {
            this.router.navigateByUrl('home');
          } else {
            this.router.navigateByUrl('verify');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.loginForm.reset();
  }

  // login() {
  //   if (!this.loginForm.valid) {
  //     this.isFormValid = true;
  //     this.areCredentialsInvalid = false;
  //     return;
  //   } else if(!this.authenticationService.authenticate()) {
  //     this.isFormValid = false;
  //     this.areCredentialsInvalid = true;
  //   }
  //   this.authenticationService
  //     .login(this.loginForm.value.email, this.loginForm.value.password)
  //     .subscribe();
  // }

  // onSubmit(signInForm: NgForm) {
  //   console.log(signInForm);
  //   if (!signInForm.valid) {
  //     this.isFormValid = true;
  //     this.areCredentialsInvalid = false;
  //     return;
  //   }
  //   this.checkCredentials(signInForm);
  // }

  // private checkCredentials(signInForm: NgForm) {
  //   console.log(signInForm.value.password);
  //   const signInData = new SignInData(
  //     signInForm.value.email,
  //     signInForm.value.password
  //   );
  //   if (!this.authenticationService.authenticate()) {
  //     this.isFormValid = false;
  //     this.areCredentialsInvalid = true;
  //   }
  //   console.log(this.areCredentialsInvalid);
  // }
}
