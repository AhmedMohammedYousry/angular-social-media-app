import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_id:number=0;
  user:User = new User();

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
    this._apiService.post('friends',{
      user_id: this.logged_user_id,
      fried_id: this.user.id
    }).subscribe((response:any)=>{
      alert(JSON.stringify(response))
      this.ngOnInit()
    },(error:any)=>{alert(JSON.stringify(error))})
  }
}
