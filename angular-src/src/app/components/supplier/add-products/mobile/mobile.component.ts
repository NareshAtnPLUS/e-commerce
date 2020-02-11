import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
  
  
  mobileForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    
    ///console.log(<FormArray>this.mobileForm.controls.variants);
    //console.log(<FormArray>this.mobileForm.controls)
    console.log(this.initVariant());
    
    this.mobileForm = this.fb.group({
      general:this.fb.group({
        brand:['',Validators.required],
        modelName:['',Validators.required],
        modelNumber:['',Validators.required],
      }),
      variants:this.fb.array([
        this.initVariant()
      ]),
      displayFeatures:this.fb.group({
        size:[null,Validators.required],
        resolution:['',Validators.required],
      }),
      osAndProcessor:this.fb.group({
        os:['',Validators.required],
        version:[null,Validators.required],
        psrName:['',Validators.required],
        psrBrand:['',Validators.required],
        core:['',Validators.required],
      }),
      camera:this.fb.group({
        primaryCamera:['',Validators.required],
        secondaryCamera:['',Validators.required],  
      }),
      networkFeatures:this.fb.group({
        networkGen:['',Validators.required],
        connectivity:['',Validators.required],
      }),
      dimension:this.fb.group({
        width:[null,Validators.required],
        height:[null,Validators.required],
        thickness:[null,Validators.required],
        weight:[null,Validators.required],
      }),
      brandWarranty:this.fb.group({
        brandWarranty:[null,Validators.required],  
      })
    }) 
    console.log(this.mobileForm)
  }
  initVariant(){
    return this.fb.group({
      color:[0,Validators.required],
      price:[0,Validators.required],
      internalStorage:[0,Validators.required],
      expandableMemory:[0,Validators.required],
      ram:[0,Validators.required],
      available:[0,Validators.required],
    })
  }
  addVariant() {
    const control = <FormArray>this.mobileForm.controls.variants;
    control.push(this.initVariant());
  }
  removeVariant(i: number) {
    const control = <FormArray>this.mobileForm.controls.variants;
    control.removeAt(i);
  }
  onAddMobileSubmit(){
    console.log(this.mobileForm.value)
  }
  

}
