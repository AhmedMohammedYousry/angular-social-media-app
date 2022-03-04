import { Notification } from './../models/notification';
import { Injectable } from '@angular/core';

import { Subject, Observable,BehaviorSubject ,Subscription } from 'rxjs';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  //declare pusher
  private pusherClient: Pusher;
  //declare notification object to be sent
  private subject: Subject<Notification> = new Subject<Notification>();

  private hasNotification =new BehaviorSubject<boolean>(true);
  
  current = this.hasNotification.asObservable();

  constructor() {
    this.pusherClient = new Pusher(environment.pusher.key,{
      authEndpoint: 'http://localhost:8000/api/pusher/auth',
      cluster:'eu',
    });

    const channel = this.pusherClient.subscribe('notification');

    channel.bind(
      'client-event',() => {
        this.subject.next(new Notification());
      }
    );
  }

  changeValue(hasNotify:boolean){
    this.hasNotification.next(hasNotify);
  }

  getFeedItems(): Observable<Notification> {
    return this.subject.asObservable();
  }
}
