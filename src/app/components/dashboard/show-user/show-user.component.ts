import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  @Input() user_name:string="";
  @Input() user_intro:string="";
  @Input() profilePic:string="";
  @Input() user_id:number=0;
  @Input() friends_number:number=0;
  storageURL = environment.storage_URL
  // @Input() is_friend:boolean=true;


  constructor() { }


  ngOnInit(): void {
  }

}
