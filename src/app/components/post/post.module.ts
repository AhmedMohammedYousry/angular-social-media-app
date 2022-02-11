import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ShowPostComponent } from './show-post/show-post.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { ShowCommentComponent } from './show-comment/show-comment.component';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';

const routes: Routes = [
  {path:'post',component:ShowPostComponent},
  
];


@NgModule({
  declarations: [
    CreatePostComponent,
    ShowPostComponent,
    CreateCommentComponent,
    ShowCommentComponent,
    DateAgoPipe
  ],
  imports: [
    CommonModule,FormsModule , ReactiveFormsModule,HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CreatePostComponent,ShowPostComponent,CreateCommentComponent,ShowCommentComponent
  ]
})
export class PostModule { }
