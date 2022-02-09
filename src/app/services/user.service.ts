import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUserService } from './api-user.service';
import { BehaviorSubject } from 'rxjs';
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


}
