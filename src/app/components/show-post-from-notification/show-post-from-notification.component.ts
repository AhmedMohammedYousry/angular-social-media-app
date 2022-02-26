import { Post } from 'src/app/models/post';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-post-from-notification',
  templateUrl: './show-post-from-notification.component.html',
  styleUrls: ['./show-post-from-notification.component.css']
})
export class ShowPostFromNotificationComponent implements OnInit {
  post_id:number;
  post:Post;

  constructor(private route: ActivatedRoute, private _apiUserService: ApiUserService,
    private _httpClient: HttpClient, private _apiService: ApiService,
    private _router: Router, private _userService: UserService, private _matDialog: MatDialog) { }


  ngOnInit(): void {
    this.post_id = this.route.snapshot.params['id'],
    this._apiService.getOne('posts',this.post_id).subscribe(
      (response:any)=>{
        this.post = response;
        console.log(this.post);
        console.log(this.post.id);

      },
      (error:any)=>{}
    );

  }

}
