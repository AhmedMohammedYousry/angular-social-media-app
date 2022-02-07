import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin=new FormGroup({});
  constructor(private _formBuilder:FormBuilder,private _apiUserService:ApiUserService,private _router:Router,private _userService:UserService) { }

  ngOnInit(): void {
    this.formLogin=this._formBuilder.group({
      Email:['' , [Validators.required,Validators.maxLength(50),Validators.minLength(10)]],
      Password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]]
    });
  }

  login():void{

    // alert(JSON.stringify(this.formLogin.value));
    //Call API to validate user
    this._userService.login('3453535453453453453535353535');
    
    this._userService.validate(this.formLogin.value.Email,this.formLogin.value.Password)
    this._router.navigateByUrl('/profile');
  }



  isValidControl(name:string):boolean
  {
    return this.formLogin.controls[name].valid;
  }

  isInValidAndTouched(name:string):boolean
  {
    return  this.formLogin.controls[name].invalid && (this.formLogin.controls[name].dirty || this.formLogin.controls[name].touched);
  }

  isControlHasError(name:string,error:string):boolean
  {
    return  this.formLogin.controls[name].invalid && this.formLogin.controls[name].errors?.[error];
  }

}
