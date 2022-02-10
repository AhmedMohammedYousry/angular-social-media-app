
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
  friends:string[]=[];
  constructor(private _apiUserService:ApiUserService, private _httpClient:HttpClient,private _apiService:ApiService) { 
    
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    });
    let options = {
      'headers': headers
    }
    this._apiService.getOne('users',parseInt(`${localStorage.getItem('id')}`),options)
    .subscribe(
      (response:any)=>{
        // alert(JSON.stringify(response))
        this.user = response[parseInt(`${localStorage.getItem('id')}`)-1]
        // get friends' names
        let i =1;
        this.user.friends.forEach((friend:any)=>{
          this._apiService.getOne('users',parseInt(friend.friend_id),options)
          .subscribe((res:any)=>{this.friends.push(res[i].firstname);i=i+1;});
        })
      },
      (error:any)=> {}
    )
    
    
  }
  
}
