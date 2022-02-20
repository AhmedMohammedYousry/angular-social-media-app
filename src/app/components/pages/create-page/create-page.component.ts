import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from 'src/app/services/api-user.service';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/page';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  private _apiService: any;

  constructor(private _FormBuilder: FormBuilder, private _apiUserService: ApiUserService, private _router: Router) { }
  formCreatePage = new FormGroup({})
  
 
page:Page = new Page();
 user:User=new User();
 user_id=parseInt(`${localStorage.getItem('id')}`);


  ngOnInit(): void {

    this.formCreatePage = this._FormBuilder.group({
      user_id: ['',[Validators.required]],
      page_name: ['',[Validators.required]],
      about: ['', [Validators.required]],
      profile_image: ['',[Validators.required]],
      cover_image: ['',[Validators.required]],


    })
    this._apiService.getOne('users',this.user_id)
    .subscribe(
      (response:any)=>{
        // alert(JSON.stringify(response))
        this.user = response
        // [parseInt(`${localStorage.getItem('id')}`)-1]
        // alert(JSON.stringify(response))
      },
      (error:any)=> {
        console.log(error)
      }
    )




  }

  post():void{

    //alert(JSON.stringify(this.formCreatePage.value));
      //Call API to create page    
      console.log(this.formCreatePage.value);
        this._apiUserService.post(`pages`,this.formCreatePage.value)
        .subscribe(
          (response:any)=>{
            this._router.navigateByUrl('/pages');
          },
          (error:any)=>{
            console.log(error)
          }
        );
        
      
    }
    isValidControl(name:string):boolean
  {
    return this.formCreatePage.controls[name].valid;
  }

  isInValidAndTouched(name:string):boolean
  {
    return  this.formCreatePage.controls[name].invalid && (this.formCreatePage.controls[name].dirty || this.formCreatePage.controls[name].touched);
  }

  isControlHasError(name:string,error:string):boolean
  {
    return  this.formCreatePage.controls[name].invalid && this.formCreatePage.controls[name].errors?.[error];
  }
    

}