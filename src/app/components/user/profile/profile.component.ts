import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';

import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { DateAgoPipe  } from 'src/app/pipes/date-ago.pipe';
import { CommentcontentPipe } from 'src/app/pipes/commentcontent.pipe';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ImageFormComponent } from '../image-form/image-form.component';
import { ProfilePicture } from 'src/app/models/profilepicture';
import { FullImageComponent } from '../../full-image/full-image.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: User = new User();
  sharedPosts: Post[] = [];
  profilePosts: Post[] = [];
  profilepictures: ProfilePicture[] = [];
  storageURL = environment.storage_URL
  constructor(private _apiUserService: ApiUserService, private _httpClient: HttpClient,
    private _apiService: ApiService, private _router: Router, private _matDialog: MatDialog) {

  }

  ngOnInit(): void {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${localStorage.getItem('Token')}`,
    //   id: `${localStorage.getItem('id')}`
    // });
    // let options = {
    //   'headers': headers
    // }
    this._apiService.getOne('users', parseInt(`${localStorage.getItem('id')}`))
      .subscribe(
        (response: any) => {
          // alert(JSON.stringify(response))
          this.user = response
          // alert(JSON.stringify(this.user.posts))
          // get shared posts by user
          this.user.posts = this.user.posts.filter((post: any) => post.page_id == null)
          this._apiService.get("shares").subscribe((res: any) => {
            let shares = res
            shares = shares.filter((share: any) => { return share.user_id == this.user.id })
            shares.forEach((share: any) => {
              this._apiService.getOne("posts", share.post_id)
                .subscribe((resp: any) => {
                  this.sharedPosts.push(resp.data)
                  let post: Post = resp.data
                  post.isShared = true
                  post.shared_at = share.created_at
                  // alert(JSON.stringify(post))
                  this.profilePosts.push(post)
                });
            })
            setTimeout(() => {

              this.profilePosts = this.profilePosts.concat(this.user.posts)
              this.profilePosts.sort(function (a, b): any {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                let b_timestamp: any = b.shared_at ? b.shared_at : b.created_at;
                let a_timestamp: any = a.shared_at ? a.shared_at : a.created_at;
                return new Date(b_timestamp).getTime() - new Date(a_timestamp).getTime()
              });
            }, 500)




          })



          this.user.posts = this.user.posts.reverse()


          // [parseInt(`${localStorage.getItem('id')}`)-1]
          this._apiService.get('profilepics').subscribe((pics: any) => {
            pics = pics.filter((pic: any) => pic.user_id == this.user.id)
            this.profilepictures = pics
          })

        },
        (error: any) => {
          // unauthorized
          // this._router.navigateByUrl('/login')
        }
      )
  }

  goToProfile(user_id: number) {
    this._router.navigateByUrl(`users/${user_id}`);

  }

  goToPage(page_id: number) {
    this._router.navigateByUrl(`pages/${page_id}`);
  }
  goToEditProfile() {
    this._router.navigateByUrl(`profile/edit`);
  }
  expandPic(data: string) {
    const dialogRef = this._matDialog.open(FullImageComponent
      , {
        data: data,
        height: '450px',
        width: '650px',
      });
  }


}
