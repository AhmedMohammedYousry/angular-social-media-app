import { User } from './../../../models/user';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private _api: ApiService) { }
  homePressed:boolean=false;
  normalPressed:boolean=false;
  postsPressed:boolean=false;
  pagesPressed:boolean=false;
  usersPressed:boolean=false;
  superAdmin:boolean=false;
  
  user:User;
  permission:number=0;


  ngOnInit(): void {
    this._api.getOne('users',parseInt(localStorage.getItem('id'))).subscribe(
      (response:any)=>{
        this.user=response;
        this.permission = this.user.permission;
        console.log(this.permission);
        if(this.permission == 1){
          this.superAdmin = true;
        }
      },
      (error:any)=>{

      }
    );
  }


  home(){
    this.homePressed = true;
    this.normalPressed=false;
    this.postsPressed = false;
    this.pagesPressed = false;
    this.usersPressed = false;

  }

  users(){
    this.homePressed = false;
    this.normalPressed=true;
    this.postsPressed = false;
    this.pagesPressed = false;
    this.usersPressed = false;

  }

  posts(){
    this.homePressed = false;
    this.normalPressed=false;
    this.postsPressed = true;
    this.pagesPressed = false;
    this.usersPressed = false;

  }

  pages(){
    this.homePressed = false;
    this.normalPressed=false;
    this.postsPressed = false;
    this.pagesPressed = true;
    this.usersPressed = false;

  }

  allUsers(){
    this.homePressed = false;
    this.normalPressed=false;
    this.postsPressed = false;
    this.pagesPressed = false;
    this.usersPressed = true;

  }

}
