import { ShowPostFromNotificationComponent } from './../components/show-post-from-notification/show-post-from-notification.component';
import { ShowPostComponent } from './../components/post/show-post/show-post.component';
import { NotificationsComponent } from './../components/notifications/notifications.component';
import { CreatePageComponent } from './../components/pages/create-page/create-page.component';
import { AllpagesComponent } from './../components/allpages/allpages.component';
import { Comment } from './../models/comment';
import { LeftSidebarComponent } from './../components/dashboard/left-sidebar/left-sidebar.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CreateUserComponent } from '../components/user/create-user/create-user.component';
import { AuthGuard } from '../guards/auth.guard';
import { ChatComponent } from "../components/chat/chat.component";
import { PagesComponent } from "../components/pages/pages.component";
import { UserProfileComponent } from "../components/user-profile/user-profile.component";
import { ShowUsersComponent } from '../components/dashboard/show-users/show-users.component';
import { SearchComponent } from '../components/search/search.component';
import { ShowSavePostComponent } from '../components/show-save-post/show-save-post.component';
import { AdminPanelComponent } from '../components/admin/admin-panel/admin-panel.component';
import { AdminPagesComponent } from '../components/admin/admin-pages/admin-pages.component';
import { AdminPostsComponent } from '../components/admin/admin-posts/admin-posts.component';
import { AdminUsersComponent } from '../components/admin/admin-users/admin-users.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

    // {
    //     path: 'user', 

    //     loadChildren: () => import('../components/user/user.module').then(m => m.UserModule)
    //   },

    {
        path: 'chat',
        component: ChatComponent, canActivate: [AuthGuard]
    },
    //admin routes
    {
        path: 'admin-panle',
        component: AdminPanelComponent, canActivate: [AuthGuard],
    },
    {
        path: 'admin-panle/admin-pages',
        component: AdminPagesComponent, canActivate: [AuthGuard],
    },
    {
        path: 'admin-panle/admin-posts',
        component: AdminPostsComponent, canActivate: [AuthGuard],
    },
    {
        path: 'admin-panle/admin-users',
        component: AdminUsersComponent, canActivate: [AuthGuard],
    },
    {
        path: 'pages',
        component: AllpagesComponent, canActivate: [AuthGuard]
    },
    {
        path: 'createpage',
        component: CreatePageComponent, canActivate: [AuthGuard]
    },

    { path: 'pages/:id', component: PagesComponent, canActivate: [AuthGuard] },
    { path: 'allpages', component: AllpagesComponent, canActivate: [AuthGuard] },

    { path: 'users', component: ShowUsersComponent, canActivate: [AuthGuard] },

    { path: 'posts/:id', component: ShowPostFromNotificationComponent, canActivate: [AuthGuard] },

    { path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
    {
        path: 'search',
        component: SearchComponent, canActivate: [AuthGuard]
    },
    { path: 'savepost', component: ShowSavePostComponent, canActivate: [AuthGuard] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
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