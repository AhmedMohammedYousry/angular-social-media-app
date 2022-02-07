import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'register',component:CreateUserComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},

  
  {path:'',component:LoginComponent},
];

@NgModule({
  declarations: [
    CreateUserComponent,
  LoginComponent,
  ProfileComponent],
  imports: [
    CommonModule,FormsModule , ReactiveFormsModule,HttpClientModule,
    RouterModule.forChild(routes)
  ]
  
})
export class UserModule { }
