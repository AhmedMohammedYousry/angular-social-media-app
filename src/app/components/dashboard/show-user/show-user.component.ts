import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  @Input() user_name:string="";
  @Input() user_id:number=0;
  @Input() friends_number:number=0;
  // @Input() is_friend:boolean=true;


  constructor() { }


  ngOnInit(): void {
  }

}
