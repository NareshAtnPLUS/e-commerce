import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  mobileForm = this.fb.group({
    general:this.fb.group({
      brand:['',Validators.required],
      modelName:['',Validators.required],
      modelNumber:['',Validators.required],
      variant:this.fb.array([this.createVariant()])
    }),
    displayFeatures:this.fb.group({
      size:[0,Validators.required],
      resoluion:['',Validators.required],
    }),
    osAndProcessor:this.fb.group({
      os:[0,Validators.required],
      psrType:['',Validators.required],
      psrBrand:['',Validators.required],
      core:['',Validators.required],
    }),
    expandableMemory:[0,Validators.required],
    camera:this.fb.group({
      primaryCamera:['',Validators.required],
      secondaryCamera:['',Validators.required],  
    }),
    networkFeatures:this.fb.group({
      type:['',Validators.required],
      internetConnectivity:['',Validators.required],
    }),
    dimension:this.fb.group({
      width:[0,Validators.required],
      height:[0,Validators.required],
      depth:[0,Validators.required],
      weight:[0,Validators.required],
    }),
    brandWarranty:this.fb.group({
      brandWarranty:[0,Validators.required],  
    })
  })
  constructor(private fb: FormBuilder) { }
  createVariant(){
    return this.fb.group({
      price: [0,Validators.required],
      available: [0,Validators.required],
      internalStorage: [0,Validators.required],
      color:['',Validators.required],
      ram:[0,Validators.required]
    });
  }
  ngOnInit() {
  }

}
