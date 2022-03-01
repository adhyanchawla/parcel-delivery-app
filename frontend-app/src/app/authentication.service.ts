import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../app/model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { errorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

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
  // sending the data when the user registers to the mysql database 
  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('signup'))
      );
  }

  // sending login credentials to the backend server to verify the user
  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{
    token: string;
    userId: Pick<User, 'id'>;
  }> {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<User, 'id'> }) => {
          this.userId = tokenObject.userId;
          let arr = [tokenObject.token, this.userId];
          localStorage.setItem('token', JSON.stringify(arr));
          this.isUserLoggedIn$.next(true);
          this.router.navigateByUrl('home/logged-in');
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, 'id'>;
          }>('login')
        )
      );
  }

  // when user is authenticated navigate to home component
  authenticate(): boolean {
    //console.log(this.checkCredentials(signInData));
    if (JSON.parse(localStorage.getItem('token'))) {
      this.isAuthenticated = true;
      this.router.navigateByUrl('home/logged-in');
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  //on logout redirect to home component
  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
    this.router.navigate(['']);
    localStorage.clear();
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
