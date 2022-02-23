import { SavePost } from './../../../models/savepost';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Page } from 'src/app/models/page';
import { Post } from 'src/app/models/post';
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  page:Page=new Page();
  user: User = new User();
  post:Post = new Post();
  
  listpages: Page[] = [];
  listfriends:User[] = [];
  listsaveposts:SavePost[] = [];
  constructor(private route:ActivatedRoute,private _httpClient:HttpClient,private _apiService:ApiService,private _router:Router) { }

  ngOnInit(): void {
    this._apiService.get('pages')
    .subscribe(
      (response: any) => {
        this.listpages = response
        console.log(response);

      }
    )

    this._apiService.get('users')
    .subscribe(
      (response: any) => {
        this.listfriends = response
        console.log(response);

      }
    )

    this._apiService.get('saveposts')
    .subscribe(
      (response: any) => {
        this.listsaveposts = response
        console.log(response);

      }
    )

  }
  goToPage(page_id: number) {
    this._router.navigateByUrl(`pages/${page_id}`);
  }

  goToFriend(friend_id: number) {
    this._router.navigateByUrl(`friends/${friend_id}`);
  }
  goToSavepost(savepost_id: number) {
    this._router.navigateByUrl(`saveposts/${savepost_id}`);
  }



}
