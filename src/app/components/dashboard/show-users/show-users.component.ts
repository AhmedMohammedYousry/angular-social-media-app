import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  users:User[]=[];
  user:User = new User;
  is_friend:any;
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

      }
    )
    
  }
  // friend(currentUser:User){

  //   this.is_friend=this._apiUserService.isFriend(this.user,currentUser)
  //   alert(this.is_friend)
  //   return this.is_friend
  // }

}
