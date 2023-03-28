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
    private router:Router,
    private storage: StorageService
  ) { }

  code : any;
  submitFailed : boolean = false;
  ngOnInit(): void  {
    this.route.queryParams
      .subscribe(params => {
        this.code = params['code'];
        this.redirect();
      }
    ); 
    this.storage.getUUID(this.code);
    this.submitFailed = false;
  }

  /**
   * redirect the user to the login page if the login ether didnt work or he just straight-up went to order
   */
  public redirect(){
    if(this.code == undefined){
      this.router.navigate(['/login']);
    }
  }

  submit(typ:HTMLInputElement,options:HTMLInputElement,message:HTMLInputElement){
    this.submitFailed = false;
    if(typ.value == "" || options.value == ""){
      this.submitFailed = true;
    }
    let order : Order = {
      message : message.value,
      option : options.value,
      type : typ.value,
      uid : this.storage.uuid!.uid,
      apiKey : this.storage.uuid?.apikey
    }
    this.storage.sendOrder(order)
  }
}