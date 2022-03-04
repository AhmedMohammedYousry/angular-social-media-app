import { ApiService } from './services/api.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate{
  
  private isAdmin =new BehaviorSubject<boolean>(false);
  admin:boolean=false;
  current = this.isAdmin.asObservable();
 
  changeValue(newValue:boolean){
    this.isAdmin.next(newValue);
  }
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
