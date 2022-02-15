import { Comment } from './../models/comment';
import { LeftSidebarComponent } from './../components/dashboard/left-sidebar/left-sidebar.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CreateUserComponent } from '../components/user/create-user/create-user.component';
import { AuthGuard } from '../guards/auth.guard';
import { ChatComponent } from "../components/chat/chat.component";
import { PagesComponent } from "../components/pages/pages.component";
import {  UserProfileComponent } from "../components/user-profile/user-profile.component";
import { ShowUsersComponent } from '../components/dashboard/show-users/show-users.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    // {
    //     path: 'user', 

    //     loadChildren: () => import('../components/user/user.module').then(m => m.UserModule)
    //   },
    
    {
        path: 'chat',
        component: ChatComponent,canActivate:[AuthGuard]
    },
    {
        path: 'pages',
        component: PagesComponent,canActivate:[AuthGuard]
    },

    { path: 'pages/:id', component: PagesComponent, canActivate: [AuthGuard] },

    {path: 'users',component: ShowUsersComponent, canActivate:[AuthGuard]},


    {path: 'users/:id',component: UserProfileComponent, canActivate:[AuthGuard]},

    {
    path: '',
    component: DashboardComponent,
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }