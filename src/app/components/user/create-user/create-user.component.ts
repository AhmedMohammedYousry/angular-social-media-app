import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiUserService } from 'src/app/services/api-user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formRegister=new FormGroup({});
  constructor(private _formBuilder:FormBuilder,private _apiUserService:ApiUserService,private _router:Router) { }

  ngOnInit(): void {
    this.formRegister=this._formBuilder.group({
      email:['',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      firstname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      lastname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      location:['',[Validators.required]],
      date_of_birth: ['',[Validators.required]],
      gender: ['',[Validators.required]],

    
    });
  }

  register():void{

  //alert(JSON.stringify(this.formRegister.value));
    //Call API to create user    
      this._apiUserService.post(`users`,this.formRegister.value)
      .subscribe(
        (response:any)=>{
          this._router.navigateByUrl('/login');
        },
        (error:any)=>{
          console.log(error)
        }
      );
      
    
  }
  
 /*myFunction(){
    this.formRegister.value.date_of_birth=new Date();
    let latest_date =this.datepipe.transform(this.formRegister.value.date_of_birth,'yyyy-MM-dd');
   }*/
   

  isValidControl(name:string):boolean
  {
    return this.formRegister.controls[name].valid;
  }

  isInValidAndTouched(name:string):boolean
  {
    return  this.formRegister.controls[name].invalid && (this.formRegister.controls[name].dirty || this.formRegister.controls[name].touched);
  }

  isControlHasError(name:string,error:string):boolean
  {
    return  this.formRegister.controls[name].invalid && this.formRegister.controls[name].errors?.[error];
  }

}
  


