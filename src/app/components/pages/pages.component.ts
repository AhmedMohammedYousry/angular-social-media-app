import { Post } from 'src/app/models/post';
import { Page } from './../../models/page';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  page_id:number=0;

  page:Page=new Page();
  list:Post[]=[];
  now:Date=new Date();

  constructor(private route:ActivatedRoute, private _apiUserService:ApiUserService, private _httpClient:HttpClient,private _apiService:ApiService,private _router:Router) { }

  ngOnInit(): void {
    this.page_id = this.route.snapshot.params['id']
    this._apiService.getOne('pages',this.page_id)
    .subscribe(
      (response:any)=>{
        this.page= response
        console.log(response);
        
      }
    )
  }
}
