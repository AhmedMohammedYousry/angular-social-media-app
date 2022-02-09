import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPostService } from 'src/app/services/post/api-post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  formPost=new FormGroup({});
  constructor(private _router:Router, private _apiPostService:ApiPostService,private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formPost=this._formBuilder.group({
      content:['' , [Validators.required,Validators.maxLength(120),Validators.minLength(10)]],

    
    });
  }

  post(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    });
    let options = {
      'headers': headers
    }
    this._apiPostService.post('posts',{
      content: this.formPost.value.content,
      user_id: localStorage.getItem('id')
    },options).subscribe(
      (response:any)=>{
        // this._router.navigateByUrl('post')
        location.reload(); 
      },(error:any)=>{console.log(error);
      }
    )
  }

}
