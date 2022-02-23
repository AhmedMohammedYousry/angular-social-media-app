import { Post } from 'src/app/models/post';
import { Page } from './../../models/page';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { Pagelike } from 'src/app/models/pagelike';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  page_id: number = 0;
  user: User = new User();
  listlikes: Pagelike[] = [];
  pagelike:Pagelike= new Pagelike();
  page: Page = new Page();
  list: Post[] = [];
  listpages: Page[] = [];
  now: Date = new Date();
  islike:boolean=false;
  storageURL = environment.storage_URL
  formPost=new FormGroup({});
  filesPost:any;
  dataPost:any;
  post_id:any;
  isPageOwner:boolean=false;
  logged_user_id = localStorage.getItem('id')

  constructor(private route: ActivatedRoute, private _apiUserService: ApiUserService,
     private _httpClient: HttpClient, private _apiService: ApiService,
      private _router: Router, private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.page_id = this.route.snapshot.params['id']
    this._apiService.getOne('pages',this.page_id)
    .subscribe(
      (response:any)=>{
        this.page= response
        if(this.page.pageslike.some(pagelike => pagelike.user_id ==parseInt(this.logged_user_id))){
          this.islike=true;
        }else{
          this.islike=false;
        }
        if(this.page.user_id == parseInt(this.logged_user_id))
          this.isPageOwner=true
      }
      
    )

    // form for create post
    this.formPost=this._formBuilder.group({
      content:['' , [Validators.required,Validators.maxLength(120),Validators.minLength(10)]],
      // image: [null]

    });



    this.page_id = this.route.snapshot.params['id']
    this._apiService.getOne('pages', this.page_id)
      .subscribe(
        (response: any) => {
          this.page = response
          console.log(response);

        }
      )

    this._apiService.get('pages')
      .subscribe(
        (response: any) => {
          this.listpages = response
          console.log(response);

        }
      )

  }
  goToPage(page_id: number) {
    this._router.navigateByUrl(`pages/${page_id}`);
  }
  addLike(){
    this._apiService.post('pagelikes',{
      user_id: parseInt(this.logged_user_id),
      page_id:this.page.id,
    }).subscribe((response:any)=>{
      window.location.reload()
    },(error:any)=>{})
  }

  deleteLike(){
    this._apiService.get('pagelikes')
    .subscribe((pagelikes:any)=>
    {
      let pagelike_id = pagelikes.filter((Pagelike:any)=> 
      {return (Pagelike.user_id==parseInt(localStorage.getItem('id')) && Pagelike.page_id == this.page.id)
    })[0].id
    // delete like
    this._apiService.delete('pagelikes',pagelike_id)
    .subscribe((response:any)=>{
      window.location.reload()
    },(error:any)=>{})
    })
  }

  create_post(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    });
    let options = {
      'headers': headers
    }
    this._apiService.post('posts',{
      content: this.formPost.value.content,
      page_id: this.page.id,
      user_id: this.logged_user_id

    },options).subscribe(
      (response:any)=>{
        
        this.post_id=response.id;
        if(this.filesPost){
          this.addPicToPost();
        }
        location.reload();
      },(error:any)=>{console.log(error);
      }
    )


  }

  uploadImagePost(event){
    this.filesPost = event.target.files[0]
    // console.log(this.files);
    
  }

  addPicToPost(){
    const formDataPost = new FormData();
    
    formDataPost.append('image', this.filesPost, this.filesPost.name)
    this._apiService.post(`postpicture/${this.post_id}`, formDataPost)
    .subscribe((response:any)=>{
      this.dataPost = response;
      this.formPost.get('image').reset();
    })
  }
}
