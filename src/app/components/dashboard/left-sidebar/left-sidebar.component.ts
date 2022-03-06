import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  user:User =new User;
  storageURL = environment.storage_URL;

  constructor(private _userService: UserService, 
    private _router: Router, 
    private _apiService: ApiService, 
     ) { }
 
  ngOnInit(): void {
    this._apiService.getOne('users', parseInt(localStorage.getItem("id")))
    .subscribe((response:any) => {
      this.user=response;
 
    },
    (error: any) => {
      alert(error)
    }
    );
   
}
visitProfile(){
  this._router.navigateByUrl('/profile')
}
 
}