import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../app/model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { errorHandlerService } from './error-handler.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenExpirationTimer: any;
  isAuthenticated = false;

  private url = 'http://localhost:3000/auth';

  //if user is logged in or not
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, 'id'>;
  // http module used to get or send data from/ to mysql database
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private errorHandlerService: errorHandlerService
  ) {}

  registerUser(newUserCredentials: {
    name: string;
    email: string;
    password: string;
  }) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<any>(
      'http://localhost:3000/auth/signup',
      newUserCredentials,
      { headers, observe: 'response' }
    );
  }

  // sending the data when the user registers to the mysql database 
  // signup(user: Omit<User, 'id'>): Observable<User | HttpResponse<User>> {
  //   const headers = new HttpHeaders().set('content-type', 'application/json');
  //   return this.http
  //     .post<User>(`${this.url}/signup`, user, { headers, observe: 'response' })
  //     .pipe(
  //       first(),
  //       catchError(this.errorHandlerService.handleError<User>('signup'))
  //     );
  // }

  // sending login credentials to the backend server to verify the user


  authenticateUser(userCredentials: { email: string; password: string }) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<any>(
      'http://localhost:3000/auth/login',
      userCredentials,
      { headers, observe: 'response' }
    );
  }

  setJWTToken(token: string) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const expirationDuration = (decodedToken.exp - decodedToken.iat) * 1000;
    localStorage.setItem('isVerified', decodedToken.isVerified);
    localStorage.setItem('isProfileComplete', decodedToken.isProfileComplete);
    this.autoLogout(expirationDuration);
    localStorage.setItem('userAccessToken', token);
  }

  private autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.deauthenticateUser();
    }, expirationDuration);
  }

  isProfileComplete() {
    const status = localStorage.getItem('isProfileComplete');
    if (status) {
      if (status === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isVerified() {
    const status = localStorage.getItem('isVerified');
    if (status) {
      if (status === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private getAuthToken() {
    const authToken = localStorage.getItem('userAccessToken');
    return authToken;
  }


  deauthenticateUser() {
    this.removeJWTToken();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigateByUrl('/login');
  }

  private removeJWTToken() {
    localStorage.removeItem('userAccessToken');
    localStorage.clear();
  }

  verifyUser(OTP: { userOTP: string }) {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>('http://localhost:3000/auth/verify-user', OTP, {
      headers: headers,
      observe: 'response',
    });
  }


  // login(
  //   email: Pick<User, 'email'>,
  //   password: Pick<User, 'password'>
  // ): Observable<{
  //   token: string;
  //   userId: Pick<User, 'id'>;
  // }> {
  //   return this.http
  //     .post(`${this.url}/login`, { email, password }, this.httpOptions)
  //     .pipe(
  //       first(),
  //       tap((tokenObject: { token: string; userId: Pick<User, 'id'> }) => {
  //         this.userId = tokenObject.userId;
  //         let arr = [tokenObject.token, this.userId];
  //         localStorage.setItem('token', JSON.stringify(arr));
  //         this.isUserLoggedIn$.next(true);
  //         this.router.navigateByUrl('home/logged-in');
  //       }),
  //       catchError(
  //         this.errorHandlerService.handleError<{
  //           token: string;
  //           userId: Pick<User, 'id'>;
  //         }>('login')
  //       )
  //     );
  // }

  updateUserProfile(data: any) {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(
      'http://localhost:3000/auth/updateUser',
      data,
      {
        headers: headers,
        observe: 'response',
      }
    );
  }

  getUserData() {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>('http://localhost:3000/auth/get-user-data', {
      headers: headers,
      observe: 'response',
    });
  }

  // when user is authenticated navigate to home component
  // authenticate(): boolean {
  //   //console.log(this.checkCredentials(signInData));
  //   if (JSON.parse(localStorage.getItem('token'))) {
  //     this.isAuthenticated = true;
  //     this.router.navigateByUrl('home/logged-in');
  //     return true;
  //   } else {
  //     this.isAuthenticated = false;
  //     return false;
  //   }
  // }

  //on logout redirect to home component
  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
    this.router.navigateByUrl('home');
    localStorage.clear();
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
