import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendOtp() {
    let token = this.getAuthToken();
    if(!token) {
      token = '';
      console.log('No token available');
    }
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.post<any>(
        'http://localhost:3000/mail/send-otp',
        {},
         {
        headers: headers,
        observe: 'response',
      }
      );
  }

  private getAuthToken() {
    let token = localStorage.getItem('userAccessToken');
    return token;
  }
}
