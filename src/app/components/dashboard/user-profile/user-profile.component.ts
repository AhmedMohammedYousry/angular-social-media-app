import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_id:number=0;
  user:User = new User();
  constructor(private route:ActivatedRoute, private _apiUserService:ApiUserService, private _httpClient:HttpClient,private _apiService:ApiService,private _router:Router) { }

  ngOnInit(): void {
    this.user_id = this.route.snapshot.params['id']
    this._apiService.getOne('users',this.user_id)
    .subscribe(
      (response:any)=>{
        this.user= response
      }
    )

    
    this._apiService.getOne('users',this.user_id)
    .subscribe(
      (response:any)=>{
        // alert(JSON.stringify(response))
        this.user = response
        // [parseInt(`${localStorage.getItem('id')}`)-1]
        alert(JSON.stringify(response))
        
      },
      (error:any)=> {}
    )
  }

}
