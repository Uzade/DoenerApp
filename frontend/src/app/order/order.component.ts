import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Order } from '../utils/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  constructor(
    private route:ActivatedRoute,
    private storage: StorageService
  ) {}

  code! : string;
  submitted! : boolean;
  feedBack! : String;

  ngOnInit(): void  {
    this.route.queryParams
      .subscribe(params => {
        this.code = params['code'];
        this.redirect();
      }
    ); 
    this.storage.getUUID(this.code);
  }

  /**
   * redirect the user to the login page if the login either didnt work or he just straight-up went to order
   */
  public redirect(){
    if(this.code == undefined){
      this.storage.gotoLogin();
    }
  }
  
  submit(typ:HTMLInputElement,options:HTMLInputElement,message:HTMLInputElement){
    
    this.initVal();
    if(!this.validateTyp(typ.value) || !this.validateOptions(options.value))return;
    
    let order : Order = {
      message : message.value,
      option : options.value,
      type : typ.value,
      uid : this.storage.uuid!.uid,
      apiKey : this.storage.uuid!.apiKey
    }

    typ.value = "";
    message.value = "";
    options.value = "";

    this.storage.sendOrder(order)
  }
  private initVal() {
    this.submitted = true;
    this.feedBack = "Worked";
  }
  private validateTyp(typ:String) : boolean{
    if(typ == ""){
      this.feedBack = "DoenerType is missing";
      return false;
    }
    return true;
  }
  private validateOptions(options : String): boolean{
    if(options == ""){
      this.feedBack = "Options are missing";
      return false;
    }
    return true;
  }
}