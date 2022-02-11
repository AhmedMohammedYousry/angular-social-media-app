import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.css']
})
export class ShowCommentComponent implements OnInit {

  @Input() commentOwner:string="";
  @Input() commentContent:string="";
  @Input() comment_created_at:string="";

  constructor() { }

  ngOnInit(): void {
  }

}
