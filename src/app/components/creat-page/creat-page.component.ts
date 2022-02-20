import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from 'src/app/services/api-user.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-creat-page',
  templateUrl: './creat-page.component.html',
  styleUrls: ['./creat-page.component.css']
})
export class CreatPageComponent implements OnInit {

  constructor(private _FormBuilder: FormBuilder, private _apiUserService: ApiUserService, private _router: Router) { }
  formCreatePage = new FormGroup({})

  ngOnInit(): void {

    this.formCreatePage = this._FormBuilder.group({
      user_id: ['', [Validators.required]],
      page_name: ['', [Validators.required]],
      about: ['', [Validators.required]],
      profile_image: ['', [Validators.required]],
      cover_image: ['', [Validators.required]],


    })
  }
  post():void{

    //alert(JSON.stringify(this.formCreatePage.value));
      //Call API to create page    
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
