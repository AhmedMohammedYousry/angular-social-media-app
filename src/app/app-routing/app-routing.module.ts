import { LeftSidebarComponent } from './../components/dashboard/left-sidebar/left-sidebar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CreateUserComponent } from '../components/user/create-user/create-user.component';
import { AuthGuard } from '../guards/auth.guard';
import { SecurityPageComponent  } from '../security-page/security-page.component';
const routes: Routes = [
    {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
    {path:'security-page',component:SecurityPageComponent  },
    // {
    //     path: 'user', 
       
    //     loadChildren: () => import('../components/user/user.module').then(m => m.UserModule)
    //   },
    {
path: 'dashboard',
component: DashboardComponent,
},
// {
//     path: 'security-page',
//     component:SecurityPageComponent,
//     },


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