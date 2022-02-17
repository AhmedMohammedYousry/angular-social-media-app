import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';

import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';

import { CommentcontentPipe } from 'src/app/pipes/commentcontent.pipe';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ImageFormComponent } from '../image-form/image-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user:User = new User();
  storageURL = environment.storage_URL
  constructor(private _apiUserService:ApiUserService, private _httpClient:HttpClient,
    private _apiService:ApiService,private _router:Router) { 
    
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
        this.user = response


        

        this.user.posts=this.user.posts.reverse()


        // [parseInt(`${localStorage.getItem('id')}`)-1]
        
      },
      (error:any)=> {}
    )   
  }

  goToProfile(user_id:number){
    this._router.navigateByUrl(`users/${user_id}`);

  }

  goToPage(page_id:number){
    this._router.navigateByUrl (`pages/${page_id}`);
  }
  goToEditProfile(){
    this._router.navigateByUrl (`profile/edit`);
  }
  
  
}
