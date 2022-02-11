
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import {Subscription} from 'rxjs';

import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User = new User();
  constructor(private _apiUserService:ApiUserService) { 

  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    });
    let options = {
      'headers': headers
    }
    this._apiUserService.get('users',options)
    .subscribe(
      (response:any)=>{
        console.log(response);
        
      },
      (error:any)=> {}
    )
  }

}

