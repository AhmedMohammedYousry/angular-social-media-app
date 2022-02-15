import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUserService } from './api-user.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  logged=new BehaviorSubject<boolean>(this.isLoggedIn());
  constructor(private _httpClient:HttpClient, private _apiUserService:ApiUserService) { }

  
  login(token:string)
  {
    localStorage.setItem("Token",token);
    this.logged.next(true);
  }

  isLoggedIn():boolean
  {
   let token= localStorage.getItem("Token");
   return token!=null;
  }

  logout(){
    localStorage.removeItem("Token");
    localStorage.removeItem("userid");
    localStorage.removeItem("id");

    this.logged.next(false);
  }

  isFriend(userOne:User){
    // if(userOne.friends.length==0 && userOne.friends.length==0)
    // {return false;}
    // if(userOne.friends.length>0)
    // {userOne.friends.forEach((user:any)=>{
    
    //   if(user.id==userTwoId)
    //     {
    //     return true;}
        
    // })}
    // if(userOne.friend.length>0)
    // {userOne.friend.forEach((user:any)=>{
    //   if(user.id==userTwoId)
    //     {return true;}
      
    // })}
    if(userOne.friends.some(person => person.id ==parseInt(localStorage.getItem('id')))){
      return true;
    } if(userOne.friend.some(person => person.id ==parseInt(localStorage.getItem('id')))){
      return true;

    }
      return false;  
  }


}
