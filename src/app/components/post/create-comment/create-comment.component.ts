import { Notification } from './../../../models/notification';
import { Post } from 'src/app/models/post';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  formComment=new FormGroup({});
  notificationComment:Notification;
  @Input() post_id:number=0;

  constructor(private _apiService:ApiService,private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formComment=this._formBuilder.group({
      content:['' , [Validators.required]]
    
    });


  }
  enter(){
    this._apiService.post('comments',{
      user_id:localStorage.getItem('id'),
      post_id:this.post_id,
      content:this.formComment.value.content
    }).subscribe(
      (response:any)=>{
        window.location.reload();
      },(error:any)=>{
      }
    )
      //to post notification when comment
    this._apiService.post('notifications',{
      from_user_id:localStorage.getItem('id'),
      post_id:this.post_id,
      type:'commented on your post',
    }).subscribe((response:any)=>{
      this.notificationComment =response;
    },
    (error:any)=>{});
  }

}
