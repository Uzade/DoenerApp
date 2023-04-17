import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subscription, throwError } from 'rxjs';
import { Order } from '../app/utils/order';
import { UUID } from '../app/utils/uuid';
import { ActivatedRoute,Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class StorageService {
  isAlrLoaded!:boolean;
  uuid!: UUID;
  readonly url : string = "http://localhost:8003/";

  constructor(private http: HttpClient,private router:Router) { }

  sendOrder(order: Order) {
    this.http.post(this.url+"sendOrder",order).subscribe(e => e)
  }  
  getUUID(code:string){
    let params = new HttpParams().set('code',code);
    this.http.get<UUID>(this.url+"redirect", {params} )
    .subscribe( 
      (data) =>{this.uuid = data;},
      (err) => this.gotoLogin() )
  }
  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.url+"allOrders")
  }
  gotoLogin(){
    this.router.navigate(['/login']);
  }
}
