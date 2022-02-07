import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUserService } from './api-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
}
