import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'post',component:CreatePostComponent},
  
];


@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,FormsModule , ReactiveFormsModule,HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CreatePostComponent
  ]
})
export class PostModule { }
