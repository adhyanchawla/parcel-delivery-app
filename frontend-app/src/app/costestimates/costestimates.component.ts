// component yet to be fully implemented

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-costestimates',
  templateUrl: './costestimates.component.html',
  styleUrls: ['./costestimates.component.css']
})
export class CostestimatesComponent implements OnInit {
  
  orderSummary: any;

  constructor(private router: Router, private orderService: OrderService) {
    //contains all the details of the order created
    this.orderSummary = JSON.parse(localStorage.getItem("orderCreated"));
    // console.log(this.orderSummary.orderType);
   }

  ngOnInit(): void {
    
  }

  cancelOrder() {
    localStorage.removeItem("orderCreated");
    this.router.navigateByUrl('order');
  }

  onCreateOrder() {
    //    this.orderForm.amount = this.estimateAmount;
    // console.log(this.orders);
    this.orderService.createNewOrder(
      {
        type: this.orderSummary.type,
        weight: this.orderSummary.weight,
        length: this.orderSummary.length,
        width: this.orderSummary.width,
        pickupAddress: this.orderSummary.pickupAddress,
        dropAddress: this.orderSummary.dropAddress,
        alternatePhone: this.orderSummary.alternatePhone
      }
    ).subscribe({
      next: (res) => {
        // localStorage.setItem("orderCreated", JSON.stringify(this.orderForm) );
        this.router.navigate(['/myorders']);
        localStorage.removeItem("orderCreated");
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // on clicking place order button, it navigates to the orders page where all the orders are retrieved from database
  

}
