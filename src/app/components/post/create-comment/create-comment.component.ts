import { MatDialog } from '@angular/material/dialog';
import { Notification } from './../../../models/notification';
import { Post } from 'src/app/models/post';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DialogMessageComponent } from '../../dialog-message/dialog-message.component';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  formComment=new FormGroup({});
  notificationComment:Notification;
  @Input() post_id:number=0;
  banned:boolean=false;
  banMsg:string='';
  constructor(private _apiService:ApiService,private _formBuilder:FormBuilder, private _matDialog:MatDialog) { }

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
        if(error.status == 403){
          this.banned=true;
          this.banMsg=error.error.message;
        }
        const dialogLikeError = this._matDialog.open(DialogMessageComponent, {
          data: this.banMsg
        });
      } 
    )
      //to post notification when comment
    this._apiService.post('notifications',{
      from_user_id: parseInt(localStorage.getItem('id')),
      post_id:this.post_id,
      type:'commented on your post',
    }).subscribe((response:any)=>{
      this.notificationComment =response;
    },
    (error:any)=>{});
  }

}
