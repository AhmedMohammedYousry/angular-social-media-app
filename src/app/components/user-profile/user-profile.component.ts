import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { ProfilePicture } from 'src/app/models/profilepicture';
import { User } from 'src/app/models/user';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { FullImageComponent } from '../full-image/full-image.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_id:number=0;
  user:User = new User();
  profilePosts:Post[]=[];
  profilepictures:ProfilePicture[] = [];
  storageURL = environment.storage_URL
  isfriend:boolean=false;
   logged_user_id = localStorage.getItem('id')

  constructor(private route:ActivatedRoute, private _apiUserService:ApiUserService, 
    private _httpClient:HttpClient,private _apiService:ApiService,
    private _router:Router,private _userService:UserService,private _matDialog:MatDialog) { }
  
  ngOnInit(): void {
    this.user_id = this.route.snapshot.params['id']
    this._apiService.getOne('users',this.user_id)
    .subscribe(
      (response:any)=>{
        this.user= response
        
        // alert(JSON.stringify(this.user.friend))
        // this.user.friend.forEach((person)=>{alert(person.id==parseInt(this.logged_user_id))})
        // alert(this.logged_user_id)
        if(this.user.friends.some(person => person.id ==parseInt(this.logged_user_id))){
          this.isfriend=true;
        }else if(this.user.friend.some((person) => person.id ==parseInt(this.logged_user_id))){
          this.isfriend=true;

        }else{
          this.isfriend=false;
        }

        // get photos of this user
        this._apiService.get('profilepics').subscribe((pics:any)=> {
          pics = pics.filter((pic:any) => pic.user_id == this.user.id)
          this.profilepictures = pics
        })
        
        

      }
      
    )

    
    this._apiService.getOne('users',this.user_id)
    .subscribe(
      (response:any)=>{
        // alert(JSON.stringify(response))
        this.user = response
        // get shared posts by this user
        this._apiService.get("shares").subscribe((res:any)=>{
          let shares=res
          shares=shares.filter((share:any)=>{return share.user_id==this.user.id})
          shares.forEach((share:any)=>{
          this._apiService.getOne("posts",share.post_id)
          .subscribe((resp:any)=> {
            // this.sharedPosts.push(resp.data)
            let post:Post = resp.data
            post.isShared=true
            post.shared_at=share.created_at
            // alert(JSON.stringify(post))
            this.profilePosts.push(post)
          });
        })
        setTimeout(() => {
          
          this.profilePosts =this.profilePosts.concat(this.user.posts)
            this.profilePosts.sort(function(a,b):any{
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              let b_timestamp:any = b.shared_at? b.shared_at: b.created_at;
              let a_timestamp:any = a.shared_at? a.shared_at: a.created_at;
              return new Date(b_timestamp).getTime() - new Date(a_timestamp).getTime()
            });
         },  500)
            
    
        
          
        })



        this.user.posts=this.user.posts.reverse()

        // [parseInt(`${localStorage.getItem('id')}`)-1]
        // alert(JSON.stringify(response))
        
      },
      (error:any)=> {}
    )
  }
  goToProfile(user_id:number){
    this._router.navigateByUrl(`users/${user_id}`)

  }
  
  addFriend(){
    this._apiService.post('friendship',{
      user_id: parseInt(this.logged_user_id),
      friend_id: this.user.id,
    }).subscribe((response:any)=>{
      window.location.reload()
    },(error:any)=>{})
  }
  unfriend(){
    this._apiService.get('friends')
    .subscribe((friends:any)=>
    {
      let friendship_id = friends.filter((friendship:any)=> 
      {return (friendship.user_id==parseInt(localStorage.getItem('id')) && friendship.friend_id==this.user.id)
              || (friendship.friend_id==parseInt(localStorage.getItem('id')) && friendship.user_id==this.user.id)
    })[0].id
    // delete friendship
    this._apiService.delete('friends',friendship_id).subscribe((response:any)=>{
      this.ngOnInit()
    },(error:any)=>{})
    })
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
