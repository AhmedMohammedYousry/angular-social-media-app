import { PusherService } from './../../services/pusher.service';
import { Message } from './../../models/message';
import { Chat } from './../../models/chat';
import { User } from 'src/app/models/user';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Pusher from 'pusher-js';
import { any, number, string } from 'joi';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  user: User = new User();
  chats: Chat[] = [];
  chat: Chat = new Chat;
  chatPressed: boolean = false;
  messages: Message[] = [];
  message: any;
  formMessage = new FormGroup({});
  storageURL = environment.storage_URL;
  @ViewChild('messages-box') private myScrollContainer: ElementRef;
  middelRequiredData: any = {
    chatUserName: string,
    chatUserPhoto: string,
    toUserId: number,
    chatId: number,
  };


  constructor(
    private _apiUserService: ApiUserService,
    private _httpClient: HttpClient,
    private _apiService: ApiService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private pusherService: PusherService
  ) { }

  ngOnInit(): void {
    this.formMessage=this._formBuilder.group({
      message:['',[Validators.required]],
    });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    });
    let options = {
      'headers': headers
    }
<<<<<<< HEAD
    this._apiService.getOne('users',parseInt(`${localStorage.getItem('id')}`),options)
    .subscribe(
      (response:any)=>{
        this.user = response;
        this.chats=this.user.chat_lines; 
        console.log(this.user); 
        console.log(this.chats); 
      },
      (error:any)=> {}
    )   
    Pusher.logToConsole = true;

    // const pusher = new Pusher('473d6c2ef580e2c7c5d8', {
    //   cluster: 'eu',
    //   authEndpoint: 'http://localhost:8000/api/messages',
    // });

    // const data=this.message;

    // const channel = pusher.subscribe('my-channel');
    // channel.bind('my-event',(data)=> {
    //   this.messages.push(data);
    // });
=======
    this._apiService.getOne('users', parseInt(`${localStorage.getItem('id')}`), options)
      .subscribe(
        (response: any) => {
          this.user = response;
          this.chats = this.user.chat_lines;
          console.log(this.user);
          console.log(this.chats);
        },
        (error: any) => { }
      )
    this.formMessage = this._formBuilder.group({
      message: ['', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]],
    });
>>>>>>> 1f093027ae60066aafb821aee0cc4ce1ee000ba4

    Pusher.logToConsole = true;
    this.pusherService.channel.bind('client-event', (message) => {
      console.log(message);

      this.messages.push(message);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getChat(chat_id: number, name: string, photo: string, to_user: number) {

    this.middelRequiredData = {
      chatUserName: name,
      chatUserPhoto: photo,
      toUserId: to_user,
      chatId: chat_id,
    }
    console.log(this.middelRequiredData);

    console.log('we are here');
    this._apiService.getOne('chats', chat_id).subscribe(
      (response: any) => {
        this.chatPressed = true;
        console.log(response);
        this.chat = response;
        this.messages = this.chat.messages;
        console.log(this.messages);
      },
      (error: any) => { }
    )
    window.scroll(0,document.body.scrollHeight);

  }

  sendMessage() {
    this.message = {
      content: this.formMessage.value.message,
      from_user_id: parseInt(localStorage.getItem('id')),
      to_user_id: this.middelRequiredData.toUserId,
      chat_id: this.middelRequiredData.chatId
    };
    this._apiService.post('messages', this.message).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => { 
        alert('you must enter message');
      }
    );
    console.log(this.middelRequiredData);
    this.pusherService.channel.trigger('client-event', this.message);
    this.messages.push(this.message);
    //this line to scroll down to the end of page
    window.scroll(0,document.body.scrollHeight);
    this.formMessage.reset();  
    // this.scrollToBottom();
  }
<<<<<<< HEAD
  
  isValidControl(name:string):boolean
  {
    return this.formMessage.controls[name].valid;
  }

  isInValidAndTouched(name:string):boolean
  {
    return  this.formMessage.controls[name].invalid && (this.formMessage.controls[name].dirty || this.formMessage.controls[name].touched);
  }

  isControlHasError(name:string,error:string):boolean
  {
    return  this.formMessage.controls[name].invalid && this.formMessage.controls[name].errors?.[error];
  }
=======

>>>>>>> 1f093027ae60066aafb821aee0cc4ce1ee000ba4
}
