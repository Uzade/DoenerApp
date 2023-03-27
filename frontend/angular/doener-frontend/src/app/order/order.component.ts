import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  constructor(
    private route:ActivatedRoute
    ,private router:Router
    ,private storage: StorageService
  ) { }

  code : string = "";

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
   * redirect the user to the login page if the login ether didnt work or he just straight-up went to order
   */
  public redirect(){
    if(this.code == undefined){
      this.router.navigate(['/login']);
    }
  }
}