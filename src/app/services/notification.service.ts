import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private hasNotification =new BehaviorSubject<boolean>(true);
  
  current = this.hasNotification.asObservable();

  constructor() { }

  changeValue(hasNotify:boolean){
    this.hasNotification.next(hasNotify);

  }
}
