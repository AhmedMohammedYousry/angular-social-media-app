import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Post } from '../../models/post';

import { ApiService } from '../../services/api.service';
import { FullImageComponent } from '../full-image/full-image.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posts:Post[] = []
  constructor(private _apiService:ApiService, private _userService:UserService,private _matDialog:MatDialog) { }

  ngOnInit(): void {
    this._apiService.get('posts')
    .subscribe(
      (response:any)=>{
        this.posts = response.data
        this.posts=this.posts.filter((post:any)=>post.user_id.id != localStorage.getItem('id'))
        this.posts=this.posts.reverse()
        this.posts=this.posts.filter((post:any)=>this._userService.isFriend(post.user_id))

        // alert(JSON.stringify(this.posts))
      }
    )
  }
  openDialog(): void {
    const dialogRef = this._matDialog.open(FullImageComponent
      , {
        height: '450px',
        width: '650px',
    });
  }
}
