import { NotificationService } from './../../services/notification.service';
import { PusherService } from './../../services/pusher.service';
import { Notification } from './../../models/notification';
import { User } from 'src/app/models/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Pusher from 'pusher-js';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  @Input() like: Notification;
  @Input() comment: Notification;
  @Input() share: Notification;
  @Input() accept: Notification;

  private feedSubscription: Subscription;

  user: User;
  storageURL = environment.storage_URL;

  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private pusherService: PusherService,
    private notify: NotificationService,
  ) {

    this.feedSubscription = notify.getFeedItems().subscribe((feed: Notification) => {
        this.notifications.push(feed);
      });
  }

  ngOnInit(): void {

    this._apiService.getOne('users', localStorage.getItem('id')).subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user);
        this.notifications = response.notifications;
        this.notifications = this.notifications.reverse();
        console.log(this.notifications);    
      },
      (error: any) => { }
    )
    Pusher.logToConsole = true;
    // this.pusherService.notificationChannel.bind('client-event', (notification) => {
    //   this.notifications.push(notification);
    // });

    // if (this.like != undefined) {
    //   this.pusherService.channel.trigger('client-event', this.like);
    //   this.notifications.push(this.like);
    //   this.notify.changeValue(false);
    // }

    // if (this.comment != undefined) {
    //   this.pusherService.channel.trigger('client-event', this.comment);
    //   this.notifications.push(this.comment);
    //   this.notify.changeValue(false);

    // }

    // if (this.share != undefined) {
    //   this.pusherService.channel.trigger('client-event', this.share);
    //   this.notifications.push(this.share);
    //   this.notify.changeValue(false);
    // }

    // if (this.accept != undefined) {
    //   this.pusherService.channel.trigger('client-event', this.accept);
    //   this.notifications.push(this.accept);
    //   this.notify.changeValue(false);
    // }
  }

  getNotify(post_id: number, user_id: number) {

    if (post_id == null) {
      this._router.navigateByUrl(`users/${user_id}`);
    }

    else {
      this._router.navigateByUrl(`posts/${post_id}`);
    }
  }



}
