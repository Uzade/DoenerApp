import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../app/utils/order';
import { UUID } from '../app/utils/uuid';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  
  uuid!: UUID;
  readonly url : string = "http://localhost:8003/";

  constructor(private http: HttpClient) { }

  sendOrder(order: Order) {
    //TODO joschka fragen wie
    console.log("sendOrder Method",order)
    this.http.post(this.url+"sendOrder",order).subscribe(e => console.log(e))
  }  
  /**
   * //TODO idk warum this.code nd undefined ist aber funktioniert deshalb :shrug:
   * @param code the code given by the url parameter
   */
  async getUUID(code:string){
    let params = new HttpParams().set('code',code);
    this.http.get<UUID>(this.url+"redirect", {params} ).subscribe(data =>{
      this.uuid = data;
      console.log(data)
    }) 
  }
  getOrders():Observable<Order[]>{
    //TODO joschka fragen wie
    return this.http.get<Order[]>(this.url+"allOrders")
  }

    
}
