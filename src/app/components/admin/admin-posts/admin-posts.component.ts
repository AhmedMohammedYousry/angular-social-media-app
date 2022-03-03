import { Post } from './../../../models/post';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {
  posts:Post[]=[];
  reportNotification:any;
  storageURL = environment.storage_URL;



  constructor(private _userService: UserService, 
    private _router: Router, 
    private _apiService: ApiService, 
    private _formBuilder: FormBuilder,
    private notify:NotificationService,
    ) { }

  ngOnInit(): void {
    this._apiService.get('posts').subscribe(
      (response:any)=>{
        this.posts = response;
        console.log(response);
        
      },
      (error:any)=>{

      }

    )
  }
  goToPost(post_id:number){
    this._router.navigateByUrl(`posts/${post_id}`);
  }
  
  goToUser(user_id:number){
    this._router.navigateByUrl(`users/${user_id}`);
  }

  deletePost(post_id:number){
    this._apiService.delete('posts',post_id).subscribe(
      (response:any)=>{

      },
      (error:any)=>{

      }
    )

  }
  reportUser(post_id:number,user_id:number ){
    this._apiService.update('posts',post_id,{
      is_reported: true,
    }).subscribe(
      (response:any)=>{

        console.log(response);
        
      },
      (error:any)=>{}
    );

    this.reportNotification =  {
      from_user_id: parseInt(localStorage.getItem('id')),
      to_user_id:user_id,
      type: 'your post is reported, it breaks the rules',
      post_id:null,
    }
     
  
    this._apiService.post('notifications',this.reportNotification).subscribe(
      (response:any)=>{
        this.ngOnInit();

      },
      (error:any)=>{

      }
    );

  }

  unreportUser(post_id:number,user_id:number ){
    this._apiService.update('posts',post_id,{
      is_reported: false,
    }).subscribe(
      (response:any)=>{

      },
      (error:any)=>{}
    );

    this.reportNotification =  {
      from_user_id: parseInt(localStorage.getItem('id')),
      to_user_id:user_id,
      type: 'good news, your post is unreported',
      post_id:null,
    }
     
  
    this._apiService.post('notifications',this.reportNotification).subscribe(
      (response:any)=>{
        this.ngOnInit();

      },
      (error:any)=>{

      }
    );

  }

}
