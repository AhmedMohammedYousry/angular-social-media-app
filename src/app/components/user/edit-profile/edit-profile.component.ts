import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user:User= new User;
  formUpdate=new FormGroup({});

  storageURL = environment.storage_URL
  constructor(private _apiService:ApiService, private _formBuilder:FormBuilder,private _router:Router) { }

  ngOnInit(): void {
    this._apiService.getOne("users", parseInt(localStorage.getItem('id')))
    .subscribe((response:any) => {
      this.user=response
      this.formUpdate.value.firstname=this.user.firstname
      this.formUpdate.value.lasttname=this.user.lasttname
      this.formUpdate.value.email=this.user.email
      this.formUpdate.value.location=this.user.location
      this.formUpdate.value.mobile=this.user.mobile
      this.formUpdate.value.date_of_birth=this.user.date_of_birth
      this.formUpdate.value.intro=this.user.intro
      this.formUpdate.value.school=this.user.school

    })
  // initialize form values
  this.formUpdate =this._formBuilder.group({
        email:[this.user.email,[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
        // password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        firstname:[this.user.firstname ,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
        lasttname:[this.user.lasttname ,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
        location:[this.user.location,[Validators.required]],
        mobile: [this.user.mobile ,[Validators.required]],
        date_of_birth: [this.user.date_of_birth ,[Validators.required]],
        intro: [this.user.intro ,[Validators.required]],
        school:[this.user.school ,[Validators.required]],
    })
    
  }

  update(){
    alert(JSON.stringify(this.formUpdate.value))
  }
  onSubmit(){
    this._apiService.update("users",this.user.id,this.formUpdate.value)
    .subscribe((response:any)=>{
    this._router.navigateByUrl('/profile')

    },
    (error:any)=>{console.log(error);
    })
  }




  // isValidControl(name:string):boolean
  // {
  //   return this.formUpdate.controls[name].valid;
  // }

  // isInValidAndTouched(name:string):boolean
  // {
  //   return  this.formUpdate.controls[name].invalid && (this.formUpdate.controls[name].dirty || this.formUpdate.controls[name].touched);
  // }

  // isControlHasError(name:string,error:string):boolean
  // {
  //   return  this.formUpdate.controls[name].invalid && this.formUpdate.controls[name].errors?.[error];
  // }

}
