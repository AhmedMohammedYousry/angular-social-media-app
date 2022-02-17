import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  user:User = new User;
  storageURL= environment.storage_URL
  constructor(private _apiService:ApiService) { }

  ngOnInit(): void {
    this._apiService.getOne("users",parseInt(localStorage.getItem('id')))
    .subscribe((response:any) => this.user=response)
  }

  unfriend(friendId){
    this._apiService.get('friends')
    .subscribe((friends:any)=>
    {
      let friendship_id = friends.filter((friendship:any)=> 
      {return (friendship.user_id==parseInt(localStorage.getItem('id')) && friendship.friend_id==friendId)
              || (friendship.friend_id==parseInt(localStorage.getItem('id')) && friendship.user_id==friendId)
    })[0].id
    // delete friendship
    // this._apiService.delete('friends',friendship_id).subscribe((response:any)=>{
    //   this.ngOnInit()
    // },(error:any)=>{})
    })
  }

}
