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
import {ShowUserComponent} from './components/dashboard/show-user/show-user.component'
import {ShowUsersComponent} from './components/dashboard/show-users/show-users.component'
import {MatCardModule} from '@angular/material/card';
import { PusherService } from './services/pusher.service';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullImageComponent } from './components/full-image/full-image.component';
import { AllpagesComponent } from './components/allpages/allpages.component';
import { CreatePageComponent } from './components/pages/create-page/create-page.component';
import { SearchComponent } from './components/search/search.component';


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

    PagesComponent,

    ShowUserComponent,
    ShowUsersComponent,
    SearchComponent,
    FullImageComponent,
    AllpagesComponent,
    CreatePageComponent,
    SearchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,UserModule,PostModule,ReactiveFormsModule,MatCardModule,
    MatDialogModule,BrowserAnimationsModule
  ],
  exports: [NavigationHeaderComponent,CommonModule],
  providers: [PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
