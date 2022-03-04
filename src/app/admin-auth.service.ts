import { ApiService } from './services/api.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate{

  admin:boolean=false;
  constructor(private api: ApiService) { }
  canActivate(){
   
    this.api.getOne('users',parseInt(localStorage.getItem('id'))).subscribe(
      (response:any)=>{
        let user:User=response;
        if(user.isAdmin==0){
          this.admin=false;
          alert("not allowed");
        }
        else if (user.isAdmin==1){
          this.admin=true;
        }

      },
      (error:any)=>{
        this.admin=false;
      });
    
      return this.admin;
    
  }
 
}
