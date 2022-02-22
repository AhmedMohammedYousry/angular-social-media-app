

import { User } from './../../models/user';
import { Share } from './../../models/share';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Post } from '../../models/post';
import { Page } from '../../models/page';

import { ApiService } from '../../services/api.service';
import { FullImageComponent } from '../full-image/full-image.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posts:Post[] = []
  user:User = new User;
  friendUser:User = new User
  shares:Share[]=[];

  //dashboard arrays
  friendPosts:Post[]=[];
  friendsPosts:Post[]=[];
  allFriendsPosts:Post[]=[]
  likedPagesPosts:Post[]=[];
  dashboardPosts:Post[]=[]
  constructor(private _apiService:ApiService, private _userService:UserService,private _matDialog:MatDialog) { }

  ngOnInit(): void {
    // this._apiService.getOne("users", localStorage.getItem('id')).subscribe((user:any)=>this.user=user)

    // this._apiService.get('posts')
    // .subscribe(
    //    (response:any)=>{
    //     this.posts = response.data
        
    //     this.posts.forEach((post:any)=> {if(!this._userService.isPageLiked(this.user,post.page_id)){
    //       console.log(post);
          
    //     }})
        
    //     this.posts=this.posts.filter((post:any)=>   post.user_id.id != localStorage.getItem('id'))
    //     this.posts=this.posts.reverse()
    //     this.posts=this.posts.filter((post:any)=>this._userService.isFriend(post.user_id))

    //     // alert(JSON.stringify(this.posts))
    //   }
    // )

    this._apiService.getOne("dashboard", localStorage.getItem('id')).subscribe((user:any)=>{
      this.user=user
      user.friends.forEach((friend:any)=>{
        friend.posts.forEach((post:any)=>{
          if(post.page_id==null)
              this.friendsPosts.push(post)
        })
      })
      user.friend.forEach((friend:any)=>{
        friend.posts.forEach((post:any)=>{
          if(post.page_id==null)
              this.friendPosts.push(post)
        })
      })
       this.allFriendsPosts = this.friendsPosts.concat(this.friendPosts)
      
      user.page_likes.forEach((page_like:any)=>{
        page_like.page.posts.forEach((post:any)=>{
          this.likedPagesPosts.push(post)
        })
      })
      this.dashboardPosts=this.allFriendsPosts.concat(this.likedPagesPosts)
      this.dashboardPosts.sort(function(a,b):any{
        let b_timestamp:any = b.shared_at? b.shared_at: b.created_at;
        let a_timestamp:any = a.shared_at? a.shared_at: a.created_at;
        return new Date(b_timestamp).getTime() - new Date(a_timestamp).getTime()
      });
      
    //  console.log(this.likedPagesPosts);
     
      
    })

  }
  // openDialog(): void {
  //   const dialogRef = this._matDialog.open(FullImageComponent
  //     , {
  //       height: '450px',
  //       width: '650px',
  //   });
  // }
}
