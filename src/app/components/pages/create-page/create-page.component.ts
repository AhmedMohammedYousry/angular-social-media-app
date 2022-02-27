import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from 'src/app/services/api-user.service';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/page';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { DialogMessageComponent } from '../../dialog-message/dialog-message.component';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  

  constructor(private _FormBuilder: FormBuilder, private _apiUserService: ApiUserService,
     private _router: Router,private _apiService:ApiService, private _matDialog:MatDialog) { }
  formCreatePage = new FormGroup({})
  
 
page:Page = new Page();
 user:User=new User();
 user_id=parseInt(`${localStorage.getItem('id')}`);
imageFile:any;
coverFile:any;
imageData:any;
coverData:any;
created_page_id:any;
banned:boolean=false;
  banMsg:string='';
  ngOnInit(): void {

    this.formCreatePage = this._FormBuilder.group({
      user_id: ['',[Validators.required]],
      page_name: ['',[Validators.required]],
      about: ['', [Validators.required]],
      image: [''],
      imageCover: [''],


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
      //console.log(this.formCreatePage.value);
        
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
  uploadImage(event){
    this.imageFile = event.target.files[0]
    console.log(this.imageFile);
    
  }
  uploadImageCover(event){
    this.coverFile = event.target.files[0]
    console.log(this.coverFile);
    
  }

  onSubmit(){
    this._apiUserService.post(`pages`,{
      user_id: this.user_id,
      page_name: this.formCreatePage.value.page_name,
      about: this.formCreatePage.value.about
    })
    .subscribe(
      (response:any)=>{
        this.created_page_id=response.id
        const formData = new FormData();
        formData.append('image', this.imageFile, this.imageFile.name)
        this._apiService.post(`pagepicture/${this.created_page_id}`, formData)
        .subscribe((response:any)=>{
          this.imageData = response;
          this.formCreatePage.get('image').reset();
          //for cover
                const formDataCover = new FormData();
              formDataCover.append('imageCover', this.coverFile, this.coverFile.name)
              this._apiService.post(`pagecover/${this.created_page_id}`, formDataCover)
              .subscribe((resp:any)=>{
                this.coverData = resp;
                this.formCreatePage.get('imageCover').reset();
                this._router.navigateByUrl('/pages');
              })
          
        })
        
      },(error:any)=>{
        if(error.status == 403){
          this.banned=true;
          this.banMsg=error.error.message;
        }
        const dialogLikeError = this._matDialog.open(DialogMessageComponent, {
          data: this.banMsg
        });
      } 
    );

    

    
  }
    

}