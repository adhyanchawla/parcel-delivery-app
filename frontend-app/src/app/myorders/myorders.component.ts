import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  myOrders = [];
  constructor(private orderService: OrderService) { }

  orderClicked =  false;
  ngOnInit(): void {
    
    this.orderService.getMyOrders().subscribe({
      next: (res) => {
        
        this.myOrders = res.body.data;
      },
      error: (err) => {
       
        console.log(err);
      },
    });
  }

  formatDate(dt: string) {
    const date = new Date(dt);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  }

  openModal() {
    this.orderClicked = true;
  }

  closeModal() {
    this.orderClicked = false;
  }

}
