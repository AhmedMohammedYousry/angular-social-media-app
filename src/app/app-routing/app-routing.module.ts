import { LeftSidebarComponent } from './../components/dashboard/left-sidebar/left-sidebar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CreateUserComponent } from '../components/user/create-user/create-user.component';
import { AuthGuard } from '../guards/auth.guard';
import { ShowUsersComponent } from '../components/dashboard/show-users/show-users.component';
import { UserProfileComponent } from '../components/dashboard/user-profile/user-profile.component';

const routes: Routes = [
    {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},

    // {
    //     path: 'user', 
       
    //     loadChildren: () => import('../components/user/user.module').then(m => m.UserModule)
    //   },
    {path: 'users',component: ShowUsersComponent, canActivate:[AuthGuard]},
    {path: 'users/:id',component: UserProfileComponent, canActivate:[AuthGuard]},

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