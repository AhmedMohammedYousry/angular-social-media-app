import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  isLogged=false;
  constructor(private _userService:UserService,private _router:Router) { }

  ngOnInit(): void {

    this.isLogged=this._userService.isLoggedIn();
    this._userService.logged.subscribe(status=>{
      this.isLogged=status;
    })

    
  }

  signOut(){
    this._router.navigateByUrl('/logout')
  }
  visitProfile(){
    this._router.navigateByUrl('/profile')
  }

}
