import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  pager = {};
  pageOfItems = [];
  title = 'calculator';
  data="";
  result=[];
  active=false;
  postdata : any = {};
  constructor(private http:HttpClient,private route: ActivatedRoute) {}
  log(){
    this.active=true;
    this.postdata={ expr : this.data }
    this.http.post("http://localhost:3000/cal-expr",<JSON>this.postdata).subscribe(function(response){
      console.log(response);
    })
    this.http.get<any>("http://localhost:3000/cal-expr-id").subscribe(function(response){
      console.log(response);
      this.result=response;
    })
  }

  click1(){
    this.data=this.data+'1';
  }
  click2(){
    this.data=this.data+'2';
  }
  click3(){
    this.data=this.data+'3';
  }
  click_plus(){
    this.data=this.data+'+';
  }
  click_mul(){
    this.data=this.data+'*';
  }
  click_minus(){
    this.data=this.data+'-';
  }
  click_div(){
    this.data=this.data+'/';
  }
  click_dot(){
    this.data=this.data+'.';
  }
  click_clear(){
    this.data='';
  }
  click4(){
    this.data=this.data+'4';
  }
  click5(){
    this.data=this.data+'5';
  }
  click6(){
    this.data=this.data+'6';
  }
  click7(){
    this.data=this.data+'7';
  }
  click8(){
    this.data=this.data+'8';
  }
  click9(){
    this.data=this.data+'9';
  }
  click0(){
    this.data=this.data+'0';
  }
}
