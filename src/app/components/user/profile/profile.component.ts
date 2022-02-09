
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';

import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user:User = new User();
  posts:Post[] = [];
  postOwner:string="";
  postContents:string[]=[];
  constructor(private _apiUserService:ApiUserService, private _httpClient:HttpClient,private _apiService:ApiService) { 
    
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    });
    let options = {
      'headers': headers
    }
    this._apiUserService.getUserByUserId(`${localStorage.getItem('userid')}`,options)
    .subscribe(
      (response:any)=>{
        // alert(JSON.stringify(response))
        this.user = response
        this.postOwner=response.name
        if(!localStorage.getItem('id')){
          localStorage.setItem('id', response.id)
        }
      },
      (error:any)=> {}
    )
      // get user posts
    this._apiService.get('posts',options).subscribe(
      (response:any)=>{
        response.forEach((post:any)=>{
          if(post.user_id == localStorage.getItem('id')){
            this.posts.push(post)
            this.postContents.push(post.content)
          }
        })
      },(error:any)=>{}
    )

   
    
    
  }
  
}
