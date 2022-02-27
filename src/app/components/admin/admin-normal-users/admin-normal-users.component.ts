import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-normal-users',
  templateUrl: './admin-normal-users.component.html',
  styleUrls: ['./admin-normal-users.component.css']
})
export class AdminNormalUsersComponent implements OnInit {

  users:User[]=[];
  reportNotification:any;
  storageURL = environment.storage_URL;

  constructor(private _userService: UserService, 
    private _router: Router, 
    private _apiService: ApiService, 
    private _formBuilder: FormBuilder,
    private notify:NotificationService,
    ) { }


  ngOnInit(): void {
    this._apiService.get('normal').subscribe(
      (response:any)=>{
        this.users = response;
      },
      (error:any)=>{

      }
    );

  }

  goToUser(user_id:number){
    this._router.navigateByUrl(`users/${user_id}`);
  }

  reportUser(user_id:number){
    this._apiService.update('users',user_id,{
      is_reported:true,
    }).subscribe(
      (response:any)=>{

      },
      (error:any)=>{

      }
    );
    this.reportNotification =  {
      from_user_id: parseInt(localStorage.getItem('id')),
      to_user_id:user_id,
      type: 'your account is reported from admins because it breaks the rules',
      post_id:null,
    }
     
  
    this._apiService.post('notifications',this.reportNotification).subscribe(
      (response:any)=>{

      },
      (error:any)=>{

      }
    );


  }

  unreportUser(user_id:number){
    this._apiService.update('users',user_id,{
      is_reported:false,
    }).subscribe(
      (response:any)=>{

      },
      (error:any)=>{

      }
    );

    this.reportNotification =  {
      from_user_id: parseInt(localStorage.getItem('id')),
      to_user_id:user_id,
      type: 'good news the report is canceled from admins',
      post_id:null,
    }
     
    this._apiService.post('notifications',this.reportNotification).subscribe(
      (response:any)=>{

      },
      (error:any)=>{

      }
    );




  }
  
  
 

  banUser(user_id:number){
    this._apiService.update('users',user_id,{
      is_banned:true,
    }).subscribe(
      (response:any)=>{

      },
      (error:any)=>{

      }
    );
    this.reportNotification =  {
      from_user_id: parseInt(localStorage.getItem('id')),
      to_user_id:user_id,
      type: 'your account is banned',
      post_id:null,
    }
     
    this._apiService.post('notifications',this.reportNotification).subscribe(
      (response:any)=>{

      },
      (error:any)=>{

      }
    );
  }

  unbanUser(user_id:number){
    this._apiService.update('users',user_id,{
      is_banned:false,
    }).subscribe(
      (response:any)=>{

      },
      (error:any)=>{

      }
    );
    this.reportNotification =  {
      from_user_id: parseInt(localStorage.getItem('id')),
      to_user_id:user_id,
      type: 'good news, we unbanned you',
      post_id:null,
    }
     
    this._apiService.post('notifications',this.reportNotification).subscribe(
      (response:any)=>{

      },
      (error:any)=>{

      }
    );
  }





}
