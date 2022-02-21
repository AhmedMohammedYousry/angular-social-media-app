import { Notification } from './../../models/notification';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications:Notification[]=[];
  user:User;
  storageURL = environment.storage_URL;


  constructor(private _apiService:ApiService,private _router:Router,) { }

  ngOnInit(): void {

    this._apiService.getOne('users',localStorage.getItem('id')).subscribe(
      (response:any)=>{
        this.user = response;
        console.log(this.user);
        this.notifications = response.notifications;
        this.notifications =this.notifications.reverse();
        console.log(this.notifications);
      },
      (error:any)=>{}
    )

  }

  getPost(post_id:number){
    this._router.navigateByUrl (`posts/${post_id}`);
  }

}
