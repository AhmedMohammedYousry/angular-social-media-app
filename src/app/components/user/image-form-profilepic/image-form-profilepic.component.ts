import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-image-form-profilepic',
  templateUrl: './image-form-profilepic.component.html',
  styleUrls: ['./image-form-profilepic.component.css']
})
export class ImageFormProfilepicComponent implements OnInit {

  imgfile:any;
  dataProfile:any;
  imageFormProfile = new FormGroup({});
  @Input() apiEndpoint = "profilepicture";
  constructor(private _formBuilder:FormBuilder, private _apiService:ApiService) { }

  ngOnInit(): void {
    this.imageFormProfile=this._formBuilder.group({
      image: [null, Validators.required]
    });
  }
  
  uploadImageProfile(event){
    this.imgfile = event.target.files[0]
    // alert(JSON.stringify(this.imgfile))
    // console.log(event.target.files);
    
  }

  onSubmitProfile(){


    const formDataa = new FormData();
    formDataa.append('image', this.imgfile, this.imgfile.name)
    this._apiService.post(`${this.apiEndpoint}/${localStorage.getItem('id')}`, formDataa)
    .subscribe((response:any)=>{
      this.dataProfile = response;
      this.imageFormProfile.get('image').reset();
      window.location.reload();
    })
  }
}
