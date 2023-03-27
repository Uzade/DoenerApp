import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  constructor(
    private route:ActivatedRoute
    ,private router:Router
    ,private http: HttpClient) { }

  code : string = "";
  url : string = "http://localhost:5173/redirect?code=";
  uuid : UUID | undefined;
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {

        this.code = params['code'];

        if(this.code == undefined){
          this.router.navigate(['/login']);
        }
      }
    ); 
    this.http.get<UUID>(this.url+this.code).subscribe(data =>{
      this.uuid = data;
      console.log(this.uuid)
    })
  }
}

interface UUID {
  apikey : string;
  uid : string;
}