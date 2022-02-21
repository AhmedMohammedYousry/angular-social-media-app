import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {

  files:any;
  data:any;
  imageForm = new FormGroup({});
  @Input() apiEndpoint = "profilepicture";
  constructor(private _formBuilder:FormBuilder, private _apiService:ApiService) { }

  ngOnInit(): void {
    this.imageForm=this._formBuilder.group({
      image: [null, Validators.required]
    });
  }
  
  uploadImage(event){
    this.files = event.target.files[0]
    // console.log(this.files);
    
  }

  onSubmit(){


    const formData = new FormData();
    formData.append('image', this.files, this.files.name)
    this._apiService.post(`${this.apiEndpoint}/${localStorage.getItem('id')}`, formData)
    .subscribe((response:any)=>{
      this.data = response;
      this.imageForm.get('image').reset();
      window.location.reload();
    })
  }

}
