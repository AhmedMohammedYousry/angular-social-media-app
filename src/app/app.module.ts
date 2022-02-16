import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserModule } from './components/user/user.module';
import { HeaderComponent } from './components/header/header.component';
import { PostModule } from './components/post/post.module';
import { RightsideComponent } from './components/dashboard/rightside/rightside.component';
import { LeftSidebarComponent } from './components/dashboard/left-sidebar/left-sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { PagesComponent } from './components/pages/pages.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FriendsComponent } from './components/friends/friends.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PhotosComponent } from './components/photos/photos.component';
import { AllpagesComponent } from './components/allpages/allpages.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RightsideComponent,
    LeftSidebarComponent,
    DashboardComponent,
    NavigationHeaderComponent,
    ChatComponent,
    PagesComponent,
    UserProfileComponent,
    FriendsComponent,
    EditProfileComponent,

    PhotosComponent,
     AllpagesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,UserModule,PostModule,ReactiveFormsModule
  ],
  exports: [NavigationHeaderComponent,CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
