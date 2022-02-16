import { Page } from './../../models/page';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  user: User = new User;
  post:Post= new Post;
  page:Page=new Page;
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

  search(): void {

    //alert(JSON.stringify(this.formRegister.value));
    //Call API to create user    
    this._apiService.getName(`search`,this.formsearch.value.search)
    .subscribe(
      (response: any) => {
        alert(JSON.stringify(response));
        this.user=response;
        this.post=response;
        this.page=response;
        this._router.navigateByUrl (`search`);
      },
      (error: any) => {
        alert(error)
      }
      );

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

  signOut() {
    this._router.navigateByUrl('/logout')
  }
  visitProfile() {
    this._router.navigateByUrl('/profile')
  }

}


