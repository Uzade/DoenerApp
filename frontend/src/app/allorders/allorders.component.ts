import { Component , OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage.service';
import { Order } from '../utils/order';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  
  constructor(private storage: StorageService){}

  orders!: Observable<Order[]>; 

  ngOnInit(): void {
    this.orders = this.storage.getOrders()
  }

}
