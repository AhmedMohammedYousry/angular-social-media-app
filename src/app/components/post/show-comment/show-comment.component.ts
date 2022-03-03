import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.css']
})
export class ShowCommentComponent implements OnInit {

  @Input() commentOwner:string="";
  @Input() commentOwnerPic:string="";
  @Input() commentOwnerId:any;
  @Input() commentContent:string="";
  @Input() comment_created_at:string="";
  storageURL = environment.storage_URL

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  goToProfile(user_id: number) {
    this._router.navigate([`/users/${user_id}`])
              .then(() => {
                window.location.reload();
              });

  }

}
