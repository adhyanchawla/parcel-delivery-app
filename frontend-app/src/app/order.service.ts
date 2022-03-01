// this section has not yet been fully implemented
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  userId = JSON.parse(localStorage.getItem('token'))[1];

  //headers created
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router, private errorHandlerService: errorHandlerService) {
  
  }

  // upload form data
  uploadFormData(x: FormData): Observable<any> {
    return this.http.post('http://localhost:3000/upload', x);
  }

  // posting an order to the database
  postOrder(
    orderId: Omit<Order, 'id'>
  ): Observable<any> {
    return this.http.post(`${this.url}/postOrder`, orderId, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Order>('order')),
    )
  }

  //get all orders
  fetchAll() : Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/getOrders`, { responseType: 'json'}).pipe(
      catchError(this.errorHandlerService.handleError<Order[]>("fetchAll", []))
    )
  }
}
