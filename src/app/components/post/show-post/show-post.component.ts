import { Notification } from './../../../models/notification';
import { DialogMessageComponent } from './../../dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { SavePost } from 'src/app/models/savepost';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';
import { PusherService } from 'src/app/services/pusher.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  @Input() postOwner: string = "";
  @Input() postOwnerId: any;
  @Input() profilePic: string = "";
  storageURL = environment.storage_URL
  @Input() postContent: string = "";
  @Input() created_at: string = "";
  @Input() comments_number: any;
  @Input() post_likes_number: any;
  @Input() post_shares_number: any;
  @Input() like: number = 0;
  @Input() post_id: number = 100;
  loggedInUserId = parseInt(localStorage.getItem('id'));
  postlike_id: any;
  @Input() hasPic: boolean = false;
  @Input() postPic: any;
  @Input() showDeleteButton: boolean = false;
  @Input() showShareButton: boolean = false;
  @Input() saveposts: SavePost = new SavePost();
  notificationLike:Notification=new Notification();
  notificationShare:Notification=new Notification();
  @Input() imageFolder: string = "profiles";
  @Input() nameLink: string = "users";

  likebtn() {

    if (this.like == 0) {
      this._apiService.post('postslikes', {
        post_id: this.post_id,
        user_id: localStorage.getItem('id'),
      }).subscribe((res: any) => {
        this.like = 1 - this.like;
        this.post_likes_number++;
        this.ngOnInit();

      })
      // to post notification when like
      this._apiService.post('notifications', {
        from_user_id: localStorage.getItem('id'),
        post_id: this.post_id,
        type: 'liked your post',
      }).subscribe((response: any) => {
        this.notificationLike = response;
      },
        (error: any) => { });

      this.pusherService.notificationChannel.trigger('client-event', this.notificationLike);

    } else {
      this._apiService.delete('postslikes', this.postlike_id)
        .subscribe((res: any) => {
          this.post_likes_number--;
          this.like = 1 - this.like

        }
        )
    }
  }

  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private _matDialog: MatDialog,
    private pusherService: PusherService
  ) { }

  ngOnInit(): void {
    this._apiService.get('postslikes')
      .subscribe((response: any) => {
        response.forEach((obj: any) => {
          if (obj.post_id == this.post_id && obj.user_id == localStorage.getItem('id')) {
            this.like = 1
            this.postlike_id = obj.id
          }
        })
      }, (error: any) => {

      })

    this.pusherService.notificationChannel.bind('client-event', (Notification) => {
      console.log(Notification);
    });
  }

  deletePost() {
    this._apiService.delete('posts', this.post_id)
      .subscribe((response: any) => {
        window.location.reload();
      }, (error: any) => { JSON.stringify(error) })
  }

  sharePost() {
    this._apiService.post("shares", {
      user_id: localStorage.getItem('id'),
      post_id: this.post_id
    }).subscribe((response: any) => {

      const dialogRef = this._matDialog.open(DialogMessageComponent, {
        data: "You have shared this post on your profile!"
      });

    });

    this._apiService.post('notifications', {
      from_user_id: parseInt(localStorage.getItem('id')),
      post_id: this.post_id,
      type: 'shared your post',
    }).subscribe((response: any) => {
        this.notificationShare=response;
    },
      (error: any) => { });
  }

  savePost() {

    this._apiService.post('saveposts', {
      user_id: this.loggedInUserId,
      post_id: this.post_id,
    }).subscribe((response: any) => {
      window.location.reload()
      this.ngOnInit()

    }, (error: any) => { })
  }

  unsave() {
    this._apiService.get('saveposts')
      .subscribe((saveposts: any) => {
        let saveposts_id = saveposts.filter((SavePost: any) => {
          return (SavePost.user_id == parseInt(localStorage.getItem('id')))
            || (SavePost.post_id == parseInt(localStorage.getItem('id')))
        })[0].id
        // delete friendship
        this._apiService.delete('saveposts', saveposts_id)
          .subscribe((response: any) => {
            window.location.reload()
            this.ngOnInit()
          }, (error: any) => { })
      })
  }
}
