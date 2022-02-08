
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiUserService } from 'src/app/services/api-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user:User = new User();
  postOwner:string="";
  constructor(private _apiUserService:ApiUserService, private _httpClient:HttpClient) { 
    
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

   
    
    
  }
  
}
