import { Component, OnInit } from '@angular/core';
import { HttpHandlerService } from 'src/app/services/http-handler.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {
  uploadForm: FormGroup
  selectedFile:File;
  constructor(
    private httpHandler:HttpHandlerService,
    private http:HttpClient,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      productImage: ['']
    });
  }
  onFileSelected(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('productImage').setValue(file);
    }
  }
  onUpload(){
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('productImage').value);
    console.log(formData,typeof this.uploadForm)
    this.http.post<any>('http://localhost:3000/supplier/add-product-image', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}
