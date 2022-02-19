import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Pusher from "pusher-js"

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;
  constructor() { 
    this.pusher = new Pusher(environment.pusher.key,{
      authEndpoint: 'http://localhost:8000/api/pusher/auth',
      cluster:'eu',
    });
    this.channel = this.pusher.subscribe('private-messages');
  }
}
