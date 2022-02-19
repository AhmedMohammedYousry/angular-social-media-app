import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl:'./user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_id:number=0;
  user:User = new User();
  storageURL = environment.storage_URL
  isfriend:boolean=false;
   logged_user_id = localStorage.getItem('id')

  constructor(private route:ActivatedRoute, private _apiUserService:ApiUserService, private _httpClient:HttpClient,private _apiService:ApiService,private _router:Router,private _userService:UserService) { }
  
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
        
        

      }
      
    )

    
    this._apiService.getOne('users',this.user_id)
    .subscribe(
      (response:any)=>{
        // alert(JSON.stringify(response))
        this.user = response
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
      id: 3
    }).subscribe((response:any)=>{
      this.ngOnInit()
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
}
