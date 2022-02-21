import { DialogMessageComponent } from './../../dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  @Input() postOwner:string="";
  @Input() postOwnerId:any;
  @Input() profilePic:string="";
  storageURL = environment.storage_URL
  @Input() postContent:string="";
  @Input() created_at:string="";
  @Input() comments_number:any;
  @Input() post_likes_number:any;
  @Input() post_shares_number:any;
  @Input() like: number = 0;
  @Input() post_id: number = 100;
  loggedInUserId=parseInt(localStorage.getItem('id'));
  postlike_id:any;
  @Input() hasPic:boolean=false;
  @Input() postPic:any;
  @Input() showDeleteButton:boolean=false;
  @Input() showShareButton:boolean=false;
  likebtn(){
    
    if(this.like == 0){
      this._apiService.post('postslikes',{
        post_id: this.post_id,
        user_id: localStorage.getItem('id'),
      }).subscribe((res:any)=>{
        this.like = 1-this.like;
        this.post_likes_number++;
        this.ngOnInit();
        
      })
      // to post notification when like
      this._apiService.post('notifications',{
        from_user_id:localStorage.getItem('id'),
        post_id:this.post_id,
        type:'liked',
      }).subscribe((response:any)=>{
  
      },
      (error:any)=>{});

    } else{
      this._apiService.delete('postslikes', this.postlike_id)
      .subscribe((res:any)=>{
        this.post_likes_number--;
        this.like = 1-this.like
        
      }
      )
  }
}
  
  constructor(private _apiService:ApiService,private _router:Router,private _matDialog:MatDialog) { }

  ngOnInit(): void {
    this._apiService.get('postslikes')
    .subscribe((response:any)=>{
      response.forEach((obj:any)=>{
        if(obj.post_id == this.post_id && obj.user_id == localStorage.getItem('id'))
        {this.like=1
        this.postlike_id=obj.id
        }
      })
    },(error:any)=>{

    })

   
  }

  deletePost(){
    this._apiService.delete('posts',this.post_id)
    .subscribe((response:any)=>{
      window.location.reload();
    },(error:any)=>{JSON.stringify(error)})
  }
  
  sharePost(){
    this._apiService.post("shares",{
      user_id: localStorage.getItem('id'),
      post_id: this.post_id
    }).subscribe((response:any)=>{
      
    const dialogRef = this._matDialog.open(DialogMessageComponent,{
      data: "You have shared this post on your profile!"
    });
  
    });
    
    this._apiService.post('notifications',{
      from_user_id:localStorage.getItem('id'),
      post_id:this.post_id,
      type:'shared',
    }).subscribe((response:any)=>{

    },
    (error:any)=>{});
  }
}
