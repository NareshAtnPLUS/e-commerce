import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  profileForm = this.fb.group({
    firstName:['',Validators.minLength(4)],
    lastName:['',Validators.minLength(5)],
    userName:['',Validators.minLength(8)],
    email:['',Validators.required],
    password:['',Validators.minLength(8)],
  })
  user:{
    firstName:string;
    lastName:string;
    email:string;
    userName:string;
    password:string;
  };
  constructor(
    private fb:FormBuilder,
    private registerService:RegisterService,
    private flashMessage:NgFlashMessageService,
    private router: Router,
    private http: HttpClient
    ) { 
    }
  
  onRegisterSubmit(){
    this.user = this.profileForm.value;
    if(!this.registerService.validateEmail(this.user.email)){
      this.flashMessage.showFlashMessage({
        messages:['Please Use Valid Email'],
        dismissible: true, timeout: 3000, type: 'danger'
      })
      return false
    }
    console.log(this.user);
    const req = this.http.post('http://localhost:3000/users/register', this.user).subscribe(
      res => {
        console.log(res);
        this.flashMessage.showFlashMessage({
          messages: ['You Are Now Registered and can Login'],
          dismissible: true, timeout: 3000, type: 'success'
          });
        this.router.navigate(['/']);
      },
      err => {
        console.log('Error Occured');
        this.flashMessage.showFlashMessage({
          messages: ['Something Went Wrong'],
          dismissible: true, timeout: 3000, type: 'danger'
          });
        this.router.navigate(['/']);
      });  
  }

}
