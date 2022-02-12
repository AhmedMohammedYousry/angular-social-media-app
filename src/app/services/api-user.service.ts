import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private _httpClient:HttpClient) { }
  get(url:string,options={}){
    return this._httpClient.get(`${environment.api_URL}/${url}`,options);
   }
   getUser(url:string, id:number,options={}){
    return this._httpClient.get(`${environment.api_URL}/${url}/${id}`,options);
   }
   generateUserToken(email:string, password:string){
    let request=  this._httpClient.post(`${environment.api_URL}/user/token`,
    {
      email: email,
      password: password,
      device_name: "test"
    }
    
  //   {
  //     "email": "mm@gmail.com",
  //     "password": "12345678",
  //     "device_name": "samsung"
  // }
  ,{responseType: 'text'});
  
    
    return request;
   }

   getUserId(email:string, password:string){
    let request=  this._httpClient.post(`${environment.api_URL}/user/id`,
    {
      email: email,
      password: password
    }
    
  ,{responseType: 'text'});
  
    
    return request;
   }
   getUserByUserId(userid:string,options={}){
    let request=  this._httpClient.post(`${environment.api_URL}/user/userid`,
    {
      userid: userid
    },options
    
  );
  
    
    return request;
   }
  
   
   post(url:string,body:any){
     let request= this._httpClient.post(`${environment.api_URL}/${url}`,body);
     
     
     return request;
    }
    
  //  put(url:string,body:any){
  //    return this._httpClient.put(`${environment.api_URL}/${url}`,body);
  //   }
 
  //   delete(url:string){
  //    return this._httpClient.delete(`${environment.api_URL}/${url}`);
  //   }
  isFriend(userOne:User,userTwo:User){
    userOne.friends.forEach(
      (user:any)=>{
        if(user.id==userTwo.id){
          return true;
        }
      }
    );
    userOne.friend.forEach(
      (user:any)=>{
        if(user.id==userTwo.id){
          return true;
        }
      }
    )
    return false;
  }

  

}
