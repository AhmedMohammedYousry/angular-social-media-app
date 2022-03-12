
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';

import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { CommentcontentPipe } from 'src/app/pipes/commentcontent.pipe';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePicture } from 'src/app/models/profilepicture';
import { SavePost } from 'src/app/models/savepost';

@Component({
  selector: 'app-show-save-post',
  templateUrl: './show-save-post.component.html',
  styleUrls: ['./show-save-post.component.css']
})
export class ShowSavePostComponent implements OnInit {

  user: User = new User();
  saveposts: SavePost[] = [];
  savepost:SavePost=new SavePost();
  post: Post = new Post();
  logged_user_id = localStorage.getItem('id')
  posts: Post[] = [];
  profilepictures: ProfilePicture[] = [];
  storageURL = environment.storage_URL
  constructor(private _apiUserService: ApiUserService, private _httpClient: HttpClient,
    private _apiService: ApiService, private _router: Router, private _matDialog: MatDialog) {

  }

  ngOnInit(): void {
    
 /*   this._apiService.get('saveposts')
      .subscribe(
        (response: any) => {
          // alert(JSON.stringify(response))
            this.saveposts = response
        },
        (error: any) => { }
      )*/

  this._apiService.getOne('users',parseInt(`${localStorage.getItem('id')}`))
      .subscribe(
        (response: any) => {
            this.user = response;
            this.saveposts=this.user.save_post.reverse();
        },

        (error: any) => { }
      )


  }

  goToProfile(user_id: number) {
    this._router.navigateByUrl(`users/${user_id}`);

  }




}