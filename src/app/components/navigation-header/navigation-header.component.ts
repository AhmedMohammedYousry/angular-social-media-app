import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  isLogged=false;
  user:User=new User;
  storageURL=environment.storage_URL
  constructor(private _userService:UserService,private _router:Router,private _apiService:ApiService) { }

  ngOnInit(): void {

    this.isLogged=this._userService.isLoggedIn();
    this._userService.logged.subscribe(status=>{
      this.isLogged=status;
    })

    this._apiService.getOne('users', parseInt(localStorage.getItem("id")))
    .subscribe((response:any) => this.user=response )

    
  }

  signOut(){
    this._router.navigateByUrl('/logout')
  }
  visitProfile(){
    this._router.navigateByUrl('/profile')
  }

}
