import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  delivery: any;

  constructor() {}

  ngOnInit(): void {
    //image loaded
    this.delivery =
      'https://corlettexpress.com/wp-content/uploads/2021/03/AdobeStock_132802484-scaled-1646x823.jpeg';
  }
}
