import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../app/utils/order';
import { UUID } from '../app/utils/uuid';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  uuid : UUID | undefined;
  url : string = "http://localhost:8003/";
  constructor(private http: HttpClient) { }


  public sendOrder(order: Order) {
    //TODO joschka fragen wie
  }  
  /**
   * //TODO idk warum this.code nd undefined ist aber funktioniert deshalb :shrug:
   * @param code the code given by the url parameter
   */
  public getUUID(code:string){
    this.http.get<UUID>(this.url+"redirect?code="+code).subscribe(data =>{
      this.uuid = data;
    }) 
  }
  public getOrders():Order[]{
    //TODO joschka fragen wie
    return new Array
  }

    
}
