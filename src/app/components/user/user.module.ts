import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {path:'register',component:CreateUserComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  
  {path:'',component:LoginComponent},
];

@NgModule({
  declarations: [
    CreateUserComponent,
  LoginComponent,
  ProfileComponent,
  LogoutComponent],
  imports: [
    CommonModule,FormsModule , ReactiveFormsModule,HttpClientModule,
    RouterModule.forChild(routes)
  ]
  
})
export class UserModule { }
