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
  storageURL = environment.storage_URL



  constructor(private _apiUserService: ApiUserService, private _httpClient: HttpClient,
    private _apiService: ApiService, private _router: Router, private _matDialog: MatDialog) {

  }
  ngOnInit(): void {
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    });
    let options = {
      'headers': headers
    }
    this._apiService.getOne('users',parseInt(`${localStorage.getItem('id')}`),options)
    .subscribe(
      (response:any)=>{
        // alert(JSON.stringify(response))
        this.user = response


        

        this.user.posts=this.user.posts.reverse()


        // [parseInt(`${localStorage.getItem('id')}`)-1]
        this._apiService.get('profilepics').subscribe((pics:any)=> {
          pics = pics.filter((pic:any) => pic.user_id == this.user.id)
          this.profilepictures = pics
        })
        
      },
      (error:any)=> {}
    )   
  }
  expandPic(data:string){
    const dialogRef = this._matDialog.open(FullImageComponent
      , {
        data: data,
        height: '450px',
        width: '650px',
    });
  }

  }
