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



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RightsideComponent,
    LeftSidebarComponent,
    DashboardComponent,
    NavigationHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,UserModule,PostModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
