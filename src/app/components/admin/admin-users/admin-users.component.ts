import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
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
    this._apiService.get('users').subscribe(
      (response:any)=>{
        this.users = response;
      },
      (error:any)=>{

      }
    )
  }

  goToUser(user_id:number){
    this._router.navigateByUrl(`users/${user_id}`);
  }

  banUser(user_id:number){


  }
  reportUser(user_id:number){

  }
  deleteUser(user_id:number){

  }
  makeAdmin(user_id:number){

  }
  unAdmin(user_id:number){
    
  }

}
