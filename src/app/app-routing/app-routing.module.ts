import { Comment } from './../models/comment';
import { LeftSidebarComponent } from './../components/dashboard/left-sidebar/left-sidebar.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CreateUserComponent } from '../components/user/create-user/create-user.component';
import { AuthGuard } from '../guards/auth.guard';
import { ChatComponent } from "../components/chat/chat.component";
import { PagesComponent } from "../components/pages/pages.component";
const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

    // {
    //     path: 'user', 

    //     loadChildren: () => import('../components/user/user.module').then(m => m.UserModule)
    //   },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'chat',
        component: ChatComponent,
    },
    {
        path: 'pages',
        component: PagesComponent,
    },

    // {
    // path: '',
    // component: CreateUserComponent,
    // },

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