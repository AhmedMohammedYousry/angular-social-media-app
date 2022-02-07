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

  validate(email:string, password:string){
   

    this._apiUserService.get('users').subscribe(
      (response:any)=>{ 
      
        response.forEach((user:any)=> {   
          if(user.email == email ){
            this._apiUserService.getUser('users',user.id).subscribe((res:any)=>{
              alert(JSON.stringify(res))
            })
          }
          
        });
      },
      (error:any)=> {

      }
    )
    
  }
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
    this.logged.next(false);
  }


}
