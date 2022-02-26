import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor() { }
  postsPressed:boolean=false;
  pagesPressed:boolean=false;
  usersPressed:boolean=false;


  ngOnInit(): void {
  }
  posts(){
    this.postsPressed = true;
    this.pagesPressed = false;
    this.usersPressed = false;

  }

  pages(){
    this.postsPressed = false;
    this.pagesPressed = true;
    this.usersPressed = false;

  }

  users(){
    this.postsPressed = false;
    this.pagesPressed = false;
    this.usersPressed = true;

  }

}
