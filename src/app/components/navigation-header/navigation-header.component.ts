import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/page';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { valid } from 'joi';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  isLogged=false;
  userName: User[]= [];
  user:User =new User;
  post:Post[]= [];
  page:Page[]=[];
  /// @Output() userName: EventEmitter<any> = new EventEmitter<any>(); 
  formsearch = new FormGroup({});
  storageURL = environment.storage_URL;
  isBadgeHidden:boolean;

  constructor(private _userService: UserService, 
    private _router: Router, 
    private _apiService: ApiService, 
    private _formBuilder: FormBuilder,
    private notify:NotificationService,
    ) { }

  ngOnInit(): void {

    this.isLogged=this._userService.isLoggedIn();
    this._userService.logged.subscribe(status=>{
      this.isLogged=status;
    })

    this._apiService.getOne('users', parseInt(localStorage.getItem("id")))
    .subscribe((response:any) => this.user=response )
    this.formsearch = this._formBuilder.group({


      search: ['', [Validators.required]],


    });

    this.notify.current.subscribe(value=> this.isBadgeHidden=value);
    console.log(this.isBadgeHidden);
    
  }

  search(): void {
    //alert(JSON.stringify(this.formRegister.value));
    //Call API to create user    
    this._apiService.getName(`search`,this.formsearch.value.search)
    .subscribe(
      (response: any) => {
        alert(JSON.stringify(response));
       // this.userName.emit(this.userName); 
        this.userName=response.resultUser;
        this.post=response.resultPost;
        this.page=response.resultPage;
        this._router.navigateByUrl (`search`);
      },
      (error: any) => {
        alert(error)
      }
      );
  }

  signOut(){
    this._router.navigateByUrl('/logout')
  }
  visitProfile(){
    this._router.navigateByUrl('/profile')
  }

  toggle(){
    this.isBadgeHidden = !this.isBadgeHidden;
    this.notify.changeValue(true);

  }

}
