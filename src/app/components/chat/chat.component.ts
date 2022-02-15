import { Message } from './../../models/message';
import { Chat } from './../../models/chat';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user:User=new User();
  chats:Chat[]=[];
  chat:Chat=new Chat;
  chatPressed:boolean=false;
  messages:Message[]=[];

  constructor(private _apiUserService:ApiUserService, private _httpClient:HttpClient,private _apiService:ApiService,private _router:Router) { 
 
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    });
    let options = {
      'headers': headers
    }
    this._apiService.getOne('users',parseInt(`${localStorage.getItem('id')}`),options)
    .subscribe(
      (response:any)=>{
       
        this.user = response;
        console.log(response);
        this.chats=this.user.chats;
        console.log(this.chats);
        
      },
      (error:any)=> {}
    )   
  }
  getChat(chat_id:number){
    console.log('we are here');
    
    this._apiService.getOne('chats',chat_id).subscribe(
      (response:any)=>{
        this.chatPressed=true;
        console.log(response);
        this.chat=response;
        this.messages=this.chat.messages;
        console.log(this.messages); 
      },
      (error:any)=>{}
    )

  }

}
