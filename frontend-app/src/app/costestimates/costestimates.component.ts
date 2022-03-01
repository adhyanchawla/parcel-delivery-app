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

  // on clicking place order button, it navigates to the orders page where all the orders are retrieved from database
  payment() {
    this.orderService.postOrder( this.orderSummary ).subscribe(
      (msg) => {
        this.router.navigate(['/myorders']); //navigate to orders page
        console.log(msg);
      }
    ) 
  }

}
