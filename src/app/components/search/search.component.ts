import { Page} from 'src/app/models/page'
import { Post } from 'src/app/models/post';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userName: User[]= [];
  user:User =new User;
  post:Post[]= [];
  page:Page[]=[];
  /// @Output() userName: EventEmitter<any> = new EventEmitter<any>(); 
  formsearch = new FormGroup({});
  storageURL = environment.storage_URL

  constructor(private _userService: UserService, private _router: Router, private _apiService: ApiService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formsearch = this._formBuilder.group({

      search: ['', [Validators.required]],


    });
    this._apiService.getOne("users",parseInt(localStorage.getItem('id')))
    .subscribe((response:any) => this.user=response)



  }
  search(): void {
    //alert(JSON.stringify(this.formRegister.value));
    //Call API to create user    
    this._apiService.getName(`search`,this.formsearch.value.search)
    .subscribe(
      (response: any) => {
        //alert(JSON.stringify(response));
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


}