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
import { PostModule } from '../post/post.module';
import { CommentcontentPipe } from 'src/app/pipes/commentcontent.pipe';
import { NavigationHeaderComponent } from '../navigation-header/navigation-header.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FriendsComponent } from './friends/friends.component';
import { PhotosComponent } from './photos/photos.component';


const routes: Routes = [
  {path:'register',component:CreateUserComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'profile/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'profile/friends',
    component: FriendsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'profile/photos',
    component: PhotosComponent,
    canActivate: [AuthGuard]
  },
  {path:'imageform',component:ImageFormComponent},

  
  {path:'',component:LoginComponent},
 

];

@NgModule({
  declarations: [
    CreateUserComponent,
  LoginComponent,
  ProfileComponent,
  LogoutComponent,
  CommentcontentPipe,
  ImageFormComponent,
  EditProfileComponent,
  FriendsComponent,
  PhotosComponent],
  imports: [
    CommonModule,FormsModule , ReactiveFormsModule,HttpClientModule,
    RouterModule.forChild(routes),
    PostModule
  ]
  
})
export class UserModule { }
