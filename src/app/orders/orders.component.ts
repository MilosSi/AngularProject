import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;
  idLocale = 1;

  constructor(private local: LocalStorageService) { }

  ngOnInit(): void {
    this.orders = this.local.ordersIn();
  }

  onDelete(i)
  {
    this.local.deleteOrder(i);
    location.reload();
  }

}
