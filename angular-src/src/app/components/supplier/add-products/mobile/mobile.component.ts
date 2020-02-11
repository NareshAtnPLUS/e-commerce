import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
  
  @Input() variantsArray:ArrayType[];
  mobileForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    let newMobileForm = this.fb.group({
      general:this.fb.group({
        brand:['',Validators.required],
        modelName:['',Validators.required],
        modelNumber:['',Validators.required],
        variants:this.fb.array([])
      }),
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
    const variantsArrayControl = <FormArray>newMobileForm.controls['variants'];
    this.variantsArray.forEach(item => {
      let newVariant = this.fb.group({
        price: [null,Validators.required],
        available: [null,Validators.required],
        internalStorage: [null,Validators.required],
        color:['',Validators.required],
        ram:[null,Validators.required],
        expandableMemory:[null,Validators.required],
      });
      variantsArrayControl.push(newVariant)
    })
    this.mobileForm = newMobileForm;
  }
  addVariant():void{
    const variantsArrayControl = <FormArray>this.mobileForm.controls['variants'];
    
      let newVariant = this.fb.group({
        price: [null,Validators.required],
        available: [null,Validators.required],
        internalStorage: [null,Validators.required],
        color:['',Validators.required],
        ram:[null,Validators.required],
        expandableMemory:[null,Validators.required],
      });
      variantsArrayControl.push(newVariant)
  }
  deleteVariant(index) {
    const variantsArrayControl = <FormArray>this.mobileForm.controls['variants'];
    variantsArrayControl.removeAt(index);
  }
  onAddMobileSubmit():void{
    console.log(this.mobileForm.value);
    
  }

}
