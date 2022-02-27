import { Page } from 'src/app/models/page';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-allpages',
  templateUrl: './allpages.component.html',
  styleUrls: ['./allpages.component.css']
})
export class AllpagesComponent implements OnInit {

  listPages: Page[] = [];
  storageURL = environment.storage_URL
  isLiked: boolean = false;
  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this._apiService.get("pages")
      .subscribe((response: any) => {
        this.listPages = response
        this.listPages.forEach((page: any) => {
          if (page.pageslike.some((p: any) => p.user_id == localStorage.getItem('id')))
            page.isLiked = true
        })
        console.log(response);

      })
  }

}
