import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {


  constructor(private _userService:UserService , private _router:Router) { }

  ngOnInit(): void {
    this._userService.logout();
    this._router.navigateByUrl('/user/login');
  }

}
