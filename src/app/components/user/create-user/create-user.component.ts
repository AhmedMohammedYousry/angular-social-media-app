import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiUserService } from 'src/app/services/api-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formRegister=new FormGroup({});
  constructor(private _formBuilder:FormBuilder,private _apiUserService:ApiUserService) { }

  ngOnInit(): void {
    this.formRegister=this._formBuilder.group({
      email:['' , [Validators.required,Validators.maxLength(50),Validators.minLength(10)]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      firstname:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      lastname:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      Address:['',[]],
      date_of_birth: ['',[]],
      gender: ['',[]],

    
    });
  }

  register():void{

    // alert(JSON.stringify(this.formRegister.value));
    //Call API to create user    
      this._apiUserService.post(`users`,this.formRegister.value)
      .subscribe(
        (response:any)=>{
          this._apiUserService.get('users')
          .subscribe((response:any)=>{alert(JSON.stringify(response))},(error:any)=>{})
        },
        (error:any)=>{}
      );
      
    
  }


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
  


