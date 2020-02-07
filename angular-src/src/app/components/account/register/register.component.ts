import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { map,debounceTime, distinctUntilChanged } from 'rxjs/operators'
import  axios  from 'axios';
let username;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements AfterViewInit {
  profileForm = this.fb.group({
    firstName:['',Validators.minLength(4)],
    lastName:['',Validators.minLength(5)],
    userName:['',Validators.minLength(8)],
    email:['',Validators.required],
    password:['',Validators.minLength(8)],
    confirmPassword:['',Validators.minLength(8)],
  })
  accountType:String = "User";
  user:{
    firstName:string;
    lastName:string;
    email:string;
    userName:string;
    password:string;
    accountType:String;
  };
  textFeildObservable$:any;
  constructor(
    private fb:FormBuilder,
    private registerService:RegisterService,
    private flashMessage:NgFlashMessageService,
    private router: Router,
    private http: HttpClient
    ) { 
      this.observer = {
        next:async function(data:string){
          console.log(data)
          
          const res = await axios.post('http://localhost:3000/users/check_username',{username:data});
            
          console.log(res.data)
          if(res.data.success){
            username =  true;
          } else{
            username =  false;
          }
          
        },
        error:function(err){
          console.error(err);
        },
        complete:function(){
          console.log('Completed');
        }
      }
    }
    observer:any
    event:{
      target:{
        value:any
      }
    }
   

    ngAfterViewInit() {
      const textFeild = document.getElementById('userName')
      this.textFeildObservable$ = fromEvent(textFeild, 'input');
      this.textFeildObservable$.pipe(map(event => event.target.value+`-${this.accountType}`),debounceTime(1000),distinctUntilChanged())
      .subscribe(this.observer)
    }
  
  onRegisterSubmit(){
    this.user = this.profileForm.value;
    this.user.accountType = this.accountType;
    if(!username){
      this.flashMessage.showFlashMessage({
        messages:['Username is already taken'],
        dismissible: true, timeout: 5000, type: 'danger'
      })
      return false;
    }
    if(!this.registerService.validateEmail(this.user.email)){
      this.flashMessage.showFlashMessage({
        messages:['Please Use Valid Email'],
        dismissible: true, timeout: 5000, type: 'danger'
      })
      return false
    }
    if(!(this.registerService.validateUpdatePassword(this.profileForm.value))){
      this.flashMessage.showFlashMessage({
        messages:['Passwords mismatch!,ReEnter with care'],
        dismissible: true, timeout: 3000, type: 'danger'
      })
      return false      
    }
    console.log(this.accountType);
    let url;
    if(this.accountType === "Admin"){ url = 'http://localhost:3000/users/register-admin' }
    else if(this.accountType === 'User'){ url = 'http://localhost:3000/users/register' }
    const req = this.http.post( url, this.user).subscribe(
      res => {
        // console.log(res);
        this.flashMessage.showFlashMessage({
          messages: ['You Are Now Registered and can Login'],
          dismissible: true, timeout: 3000, type: 'success'
          });
        this.router.navigate(['/account/login']);
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
