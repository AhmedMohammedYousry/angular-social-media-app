import { Friendrequest } from './../../../models/friendrequest';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  users:User[]=[];
  user:User = new User;
  friend_requests:Friendrequest[]=[];
  is_friend:any;
  has_friend_request:boolean=false;
  storageURL = environment.storage_URL;

  constructor(private _apiService:ApiService, private _apiUserService:ApiUserService) { }

  ngOnInit(): void {
    this._apiService.get('users')
    .subscribe(
      (response:any)=>{
        response= response.filter((user:any)=> {return user.id != localStorage.getItem('id')});

        this.users=response

      }
    )
    this._apiService.getOne('users',localStorage.getItem('id'))
    .subscribe(
      (response:any)=>{
        this.user=response;
        this.friend_requests = this.user.friend_requests;
        console.log(this.friend_requests);
        if(this.friend_requests.length>0){
          this.has_friend_request=true;
        }

      }
    )
    
  }

  accept(friend_id:number){
    this._apiService.post('friendship',{
      user_id:localStorage.getItem('id'),
      friend_id:friend_id,
    }).subscribe((response:any)=>{
    },
    (error:any)=>{
    });

  }

  ignore(){

  }

  // friend(currentUser:User){

  //   this.is_friend=this._apiUserService.isFriend(this.user,currentUser)
  //   alert(this.is_friend)
  //   return this.is_friend
  // }

}
