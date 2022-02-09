import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ShowPostComponent } from './show-post/show-post.component';

const routes: Routes = [
  {path:'post',component:ShowPostComponent},
  
];


@NgModule({
  declarations: [
    CreatePostComponent,
    ShowPostComponent
  ],
  imports: [
    CommonModule,FormsModule , ReactiveFormsModule,HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CreatePostComponent,ShowPostComponent
  ]
})
export class PostModule { }
