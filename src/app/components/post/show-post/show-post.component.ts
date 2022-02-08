import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  @Input() postOwner:string="";
  constructor() { }

  ngOnInit(): void {
  }

}
