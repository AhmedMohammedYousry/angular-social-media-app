import { Page } from 'src/app/models/page';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { ProfilePicture } from 'src/app/models/profilepicture';
import { FullImageComponent } from '../../full-image/full-image.component';
 
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  listPages:Page[]=[];
  storageURL=environment.storage_URL
  users:User[]=[];
  user:User = new User;
  profilepictures: ProfilePicture[] = [];
  private _router: any;
  private _matDialog: any;
  constructor(private _apiService:ApiService) { }
 
  ngOnInit(): void {
    // pages
    this._apiService.get("pages")
    .subscribe((response:any)=>{
      this.listPages=response
     
      console.log(response);
      
    })
// users
this._apiService.get('users')
.subscribe(
  (response:any)=>{
    response= response.filter((user:any)=> {return user.id != localStorage.getItem('id')});
 
    this.users=response
 
  }
)
 // get photos of this user
 this._apiService.get('profilepics').subscribe((pics: any) => {
  pics = pics.filter((pic: any) => pic.user_id == this.user.id)
  this.profilepictures = pics
})


 
  }
  goToProfile(user_id: number) {
    this._router.navigateByUrl(`users/${user_id}`)
 
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