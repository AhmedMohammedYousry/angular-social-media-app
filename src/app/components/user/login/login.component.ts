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
      Email:['',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      Password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  login():void{

    // alert(JSON.stringify(this.formLogin.value));
    //Call API to validate user
    let email = this.formLogin.value.Email;
    let password = this.formLogin.value.Password;
    this._apiUserService.generateUserToken(email,password)
    .subscribe(
      (response:any)=>{ 
      
        this._apiUserService.getUserId(email,password)
        .subscribe(
          (res:any)=>{
            
            localStorage.setItem("userid",res);
            this._userService.login(response);
            this._router.navigateByUrl('/profile');
          },(error:any)=>{

          }
        )
      },
      (error:any)=> {
        console.log(error);
        
        alert("failed to login")
      }
    )

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
