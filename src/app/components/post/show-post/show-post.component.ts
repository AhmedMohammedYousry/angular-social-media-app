import { Component, Input, OnInit } from '@angular/core';

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
  @Input() like: boolean = false;
  likebtn(){
      this.like = !this.like;       
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
