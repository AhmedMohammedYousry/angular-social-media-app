import { CoverPicture } from './../../../models/coverpicture';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';

import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';

import { CommentcontentPipe } from 'src/app/pipes/commentcontent.pipe';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ImageFormComponent } from '../image-form/image-form.component';
import { ProfilePicture } from 'src/app/models/profilepicture';
import { FullImageComponent } from '../../full-image/full-image.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  user: User = new User();
  profilepictures: ProfilePicture[] = [];
  prof: ProfilePicture = new ProfilePicture();
  coverpictures: CoverPicture[] = [];
  storageURL = environment.storage_URL
  profilesTab: boolean = true;
  coversTab: boolean = false;


  constructor(private _apiUserService: ApiUserService, private _httpClient: HttpClient,
    private _apiService: ApiService, private _router: Router, private _matDialog: MatDialog) {

  }
  ngOnInit(): void {


    this._apiService.getOne('users', parseInt(`${localStorage.getItem('id')}`))
      .subscribe(
        (response: any) => {
          // alert(JSON.stringify(response))
          this.user = response




          // this.user.posts=this.user.posts.reverse()


          // [parseInt(`${localStorage.getItem('id')}`)-1]
          this._apiService.get('profilepics').subscribe((pics: any) => {
            pics = pics.filter((pic: any) => pic.user_id == this.user.id)
            this.profilepictures = pics
          })

          this._apiService.get('coverpics').subscribe((pics: any) => {
            pics = pics.filter((pic: any) => pic.user_id == this.user.id)
            this.coverpictures = pics
          })

        },
        (error: any) => { }
      )
  }
  expandPic(data: string) {
    const dialogRef = this._matDialog.open(FullImageComponent
      , {
        data: data,
        height: '450px',
        width: '650px',
      });
  }

  setProfile(profilePic: any) {
    this._apiService.update("users", this.user.id, {
      profilePic: profilePic
    })
      .subscribe((response: any) => {
        this._router.navigate(['/profile'])
          .then(() => {
            window.location.reload();
          });
      })

  }
  setCover(coverPic: any) {
    this._apiService.update("users", this.user.id, {
      coverPic
    })
      .subscribe((response: any) => {

        this._router.navigate(['/profile']);
      })

  }
  showProfilesTab() {
    this.profilesTab = true;
    this.coversTab = false;
  }
  showCoversTab() {
    this.profilesTab = false;
    this.coversTab = true;
  }

  deleteprofile(namepic) {

        // delete friendship
        this._apiService.delete('profilepics', namepic)   
          .subscribe((response: any) => {
            
            window.location.reload();
          }, (error: any) => {
          })
  

  }


  deletecover(namepic) {

    // delete friendship
    this._apiService.delete('coverpics', namepic)
      .subscribe((response: any) => {

        window.location.reload();
      }, (error: any) => {

      })


}

}
