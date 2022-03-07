// this section has not yet been fully implemented
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Order } from './model/Order';
import { errorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  created = Date.now();
  orderId: Pick<Order, 'id'>;
  tokenArrray = [];
  private url = 'http://127.0.0.1:3000/order';

  userId = localStorage.getItem('userAccessToken')[1];

  //headers created
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router, private errorHandlerService: errorHandlerService) {
  
  }

  // upload form data
  // uploadFormData(x: FormData): Observable<any> {
  //   return this.http.post('http://localhost:3000/upload', x);
  // }

  // posting an order to the database
  private getAuthToken() {
    const authToken = localStorage.getItem('userAccessToken');
    return authToken;
  }

  createNewOrder(orderObject: any) {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(
      'http://localhost:3000/order/postOrder',
      orderObject,
      {
        headers: headers,
        observe: 'response',
      }
    );
  }

  //get all orders
  getMyOrders() {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>('http://localhost:3000/order/getOrders', {
      headers: headers,
      observe: 'response',
    });
  }

  getOrderDetails(id: string) {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>(
      `http://localhost:3000/orders/order-details/${id}`,
      {
        headers: headers,
        observe: 'response',
      }
    );
  }
}
