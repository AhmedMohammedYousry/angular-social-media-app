import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/page';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  isLogged = false;
  userName: User[]= [];
  user:User =new User;
  post:Post[]= [];
  page:Page[]=[];
  /// @Output() userName: EventEmitter<any> = new EventEmitter<any>(); 
  formsearch = new FormGroup({});
  storageURL = environment.storage_URL
  constructor(private _userService: UserService, private _router: Router, private _apiService: ApiService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.isLogged = this._userService.isLoggedIn();
    this._userService.logged.subscribe(status => {
      this.isLogged = status;
    })

    this._apiService.getOne('users', parseInt(localStorage.getItem("id")))
      .subscribe((response: any) => this.user = response)
    this.formsearch = this._formBuilder.group({

      search: ['', [Validators.required]],


    });

  }


  isValidControl(name: string): boolean {
    return this.formsearch.controls[name].valid;
  }

  isInValidAndTouched(name: string): boolean {
    return this.formsearch.controls[name].invalid && (this.formsearch.controls[name].dirty || this.formsearch.controls[name].touched);
  }

  isControlHasError(name: string, error: string): boolean {
    return this.formsearch.controls[name].invalid && this.formsearch.controls[name].errors?.[error];
  }


  signOut(){
    this._router.navigateByUrl('/logout')
  }
  visitProfile() {
    this._router.navigateByUrl('/profile')
  }

}


