import { Notification } from './../../../models/notification';
import { Page } from './../../../models/page';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  pages:Page[]=[];
  reportNotification:any;
  storageURL = environment.storage_URL;

  constructor(private _userService: UserService, 
    private _router: Router, 
    private _apiService: ApiService, 
    private _formBuilder: FormBuilder,
    private notify:NotificationService,
    ) { }


  ngOnInit(): void {
    this._apiService.get('pages').subscribe(
      (response:any)=>{
        console.log(response);
        this.pages=response;
      },
      (error:any)=>{

      }
    )

  }

  goToPage(page_id:number){
    this._router.navigateByUrl(`pages/${page_id}`);
  }
  
  goToUser(user_id:number){
    this._router.navigateByUrl(`users/${user_id}`);
  }

  deletePage(page_id:number){
    this._apiService.delete('pages',page_id).subscribe(
      (response:any)=>{
        this.ngOnInit();
      },
      (error:any)=>{

      }
    )

  }
  reportPage(user_id:number ,page_id:number){
    this._apiService.update('pages',page_id,{
      is_reported: true,
    }).subscribe(
      (response:any)=>{

      },
      (error:any)=>{}
    );

    this.reportNotification =  {
      from_user_id: parseInt(localStorage.getItem('id')),
      to_user_id:user_id,
      type: 'your page is reported from admins because it breaks the rules',
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

  unreportPage(user_id:number ,page_id:number){
    this._apiService.update('pages',page_id,{
      is_reported: false,
    }).subscribe(
      (response:any)=>{

      },
      (error:any)=>{}
    );

    this.reportNotification =  {
      from_user_id: parseInt(localStorage.getItem('id')),
      to_user_id:user_id,
      type: 'good news, we delete the report on your page',
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
