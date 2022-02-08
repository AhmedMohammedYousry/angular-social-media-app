import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPostService {

  constructor(private _httpClient:HttpClient) { }
  post(url:string,body:any,options={}){
    return this._httpClient.post(`${environment.api_URL}/${url}`,body,options);
  
   }
}
