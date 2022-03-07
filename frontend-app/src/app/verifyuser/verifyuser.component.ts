import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrls: ['./verifyuser.component.css']
})
export class VerifyuserComponent implements OnInit {

  otpForm: FormGroup;

  constructor(private mailService: MailService, private router: Router, private authService: AuthenticationService) { 
  }
  
  ngOnInit(): void {
    this.otpForm = this.createForm();
    this.mailService.sendOtp().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createForm(): FormGroup {
    return new FormGroup({
      otp: new FormControl('', [Validators.required,
        Validators.minLength(8)])
    })
  }

  onVerify() {
    console.log('hello');
    const OTP = {
      userOTP: this.otpForm.value.OTP,
    };
    this.authService.verifyUser(OTP).subscribe({
      next: (res) => {
        
        localStorage.setItem('isVerified', 'true');
        this.router.navigateByUrl('home/logged-in');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
