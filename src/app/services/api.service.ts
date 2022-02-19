import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient:HttpClient) { }

  get(url:string,options={}){
    return this._httpClient.get(`${environment.api_URL}/${url}`,options);
   }
   getOne(url:string,id:any,options={}){
    return this._httpClient.get(`${environment.api_URL}/${url}/${id}`,options);
   }
   post(url:string,body:any,options={}){
    return this._httpClient.post(`${environment.api_URL}/${url}`,body,options);
   }
   update(url:string,id:any,body:any,options={}){
    return this._httpClient.put(`${environment.api_URL}/${url}/${id}`,body,options);
   }
   delete(url:string,id:number,options={}){
    return this._httpClient.delete(`${environment.api_URL}/${url}/${id}`,options);
   }
   getName(url:string,name:any,options={}){
    return this._httpClient.get(`${environment.api_URL}/${url}/${name}`,options);
   }
}
