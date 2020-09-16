import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  pager: any;
  pageOfItems = {};
  seepage=false;
  constructor(private http:HttpClient,private route: ActivatedRoute) { }
  see(){
    this.seepage=true;
    this.route.queryParams.subscribe(x => this.loadPage(1));
  }
  ngOnInit(){
    this.route.queryParams.subscribe(x => this.loadPage(x.page || 1));
  }
  loadPage(page){
    this.http.get<any>("http://localhost:3000/page-get/"+page).subscribe(x => {
      this.pager = x.pager;
      this.pageOfItems = x.pageofitems;
      console.log(this.pageOfItems);
    })

  }

}
