import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { StorageService } from '../storage.service';
import { UUID } from '../uuid';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  constructor(
    private route:ActivatedRoute
    ,private router:Router
    ,private http: HttpClient
    ,private storage: StorageService
  ) { }

  code : string = "";
  url : string = "http://localhost:8003/redirect?code=";

  ngOnInit(): void  {

    this.route.queryParams
      .subscribe(params => {
        this.code = params['code'];
        //redirect the user to the login page if the login ether didnt work or he just straight-up wnt to order
        if(this.code == undefined){
          this.router.navigate(['/login']);
        }
      }
    ); 
    //TODO idk warum this.code nd undefined ist aber funktioniert deshalb :shrug:
    this.http.get<UUID>(this.url+this.code).subscribe(data =>{
      this.storage.uuid = data;
    })    

  }
}