import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  @Input() postOwner:string="";
  @Input() postContent:string="";
  @Input() created_at:string="";
  @Input() comments_number:any;
  @Input() post_likes_number:any;
  @Input() post_shares_number:any;
  @Input() like: number = 0;
  @Input() post_id: number = 100;
  postlike_id:any;

  likebtn(){

    if(this.like == 0){
      this._apiService.post('postslikes',{
        post_id: this.post_id,
        user_id: localStorage.getItem('id')
      }).subscribe((res:any)=>{
        this.like = 1-this.like;
        this.post_likes_number++;
        this.ngOnInit();
             

      })
    } else{
      this._apiService.delete('postslikes', this.postlike_id)
      .subscribe((res:any)=>{
        this.post_likes_number--;
        this.like = 1-this.like
        
      }
      )
  }
}
  
  constructor(private _apiService:ApiService,private _router:Router) { }

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

}
