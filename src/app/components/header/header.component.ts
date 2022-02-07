import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged=false;
  constructor(private _userService:UserService) { }

  ngOnInit(): void {

    this.isLogged=this._userService.isLoggedIn();
    this._userService.logged.subscribe(status=>{
      this.isLogged=status;
    })

    
  }

}
