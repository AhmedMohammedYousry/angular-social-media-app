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
  constructor() { }

  ngOnInit(): void {
  }

}
