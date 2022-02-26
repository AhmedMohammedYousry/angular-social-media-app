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
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { ShowSavePostComponent } from './components/show-save-post/show-save-post.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ShowPostFromNotificationComponent } from './components/show-post-from-notification/show-post-from-notification.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminPostsComponent } from './components/admin/admin-posts/admin-posts.component';
import { AdminPagesComponent } from './components/admin/admin-pages/admin-pages.component';
import { AdminPanelComponent } from "../app/components/admin/admin-panel/admin-panel.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { OnlineComponent } from './components/dashboard/online/online.component';
import { FooterComponent } from './components/dashboard/footer/footer.component';


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
    FullImageComponent,
    AllpagesComponent,
    CreatePageComponent,
    SearchComponent,
    DialogMessageComponent,
    ShowSavePostComponent,
    ShowPostFromNotificationComponent,
    AdminPanelComponent,
    AdminUsersComponent,
    AdminPostsComponent,
    AdminPagesComponent,
    OnlineComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,UserModule,PostModule,ReactiveFormsModule,MatCardModule,
    MatDialogModule,BrowserAnimationsModule, MatBadgeModule
  ],
  exports: [NavigationHeaderComponent,CommonModule],
  providers: [PusherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
