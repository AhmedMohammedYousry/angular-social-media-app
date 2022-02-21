import { Post } from 'src/app/models/post';
import { Page } from './../../models/page';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiService } from 'src/app/services/api.service';
import { ApiPostService } from 'src/app/services/post/api-post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  page_id:number=0;
  post_id:number=0;
  page:Page=new Page();
  list:Post[]=[];
  now:Date=new Date();
  formPost=new FormGroup({});
  filesPost:any;
  dataPost:any;

  constructor(private route:ActivatedRoute, private _apiUserService:ApiUserService, private _httpClient:HttpClient,private _apiService:ApiService,private _router:Router,private _apiPostService:ApiPostService,private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.page_id = this.route.snapshot.params['id']
    this._apiService.getOne('pages',this.page_id)
    .subscribe(
      (response:any)=>{
        this.page= response
        this.page.posts=this.page.posts.reverse();
        console.log(response);
        
      }
    )

    this.formPost=this._formBuilder.group({
      content:['' , [Validators.required,Validators.maxLength(120),Validators.minLength(10)]],
      // image: [null]
    
    });
  }



// this._apiService.getone(page.)

  create_post(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    });
    let options = {
      'headers': headers
    }
    console.log(this.page_id);
    this._apiPostService.post('posts',{
      content: this.formPost.value.content,
      user_id: localStorage.getItem('id'),
      page_id: this.page.id
     
    },options).subscribe(
      (response:any)=>{
        // this._router.navigateByUrl('post')
        this.post_id=response.id;
        this.page_id=response.id;
        // if(this.filesPost){
        //   this.addPicToPost();
        // }
        // location.reload(); 
      },(error:any)=>{console.log(error);
      }
    )

    
  }



  // uploadImagePost(event){
  //   this.filesPost = event.target.files[0]
  //   // console.log(this.files);
    
  // }



  // addPicToPost(){
  //   const formDataPost = new FormData();
    
  //   formDataPost.append('image', this.filesPost, this.filesPost.name)
  //   this._apiService.post(`postpicture/${this.post_id}`, formDataPost)
  //   .subscribe((response:any)=>{
  //     this.dataPost = response;
  //     this.formPost.get('image').reset();
  //   })
  // }

}
