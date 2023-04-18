import { Component, Input } from '@angular/core';
import { Order } from '../utils/order';
@Component({
  selector: 'app-dumbbooking',
  templateUrl: './dumbbooking.component.html',
  styleUrls: ['./dumbbooking.component.scss']
})
export class DumbbookingComponent {
  @Input() booking! : Order;
}
