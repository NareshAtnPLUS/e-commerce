import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
export interface Res {
  success: boolean;
  user: Object;
  msg:  String;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm = this.fb.group({
    userName:['',Validators.required],
    password:['',Validators.minLength(8)],
  })
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private authService:AuthService,
    private flashMessage:NgFlashMessageService,
    private router:Router
    ) { }
  user:{
    userName:string;
    password:string;
  };
  onLoginSubmit(){
    this.user = this.loginForm.value;
    const req = this.http.post<Res>('http://localhost:3000/users/authenticate', this.user).subscribe(
      res => {
        console.log(res.success,res.msg);
        if (res.success) {
          this.authService.storeUserData(res.msg, res.user);
          this.flashMessage.showFlashMessage({
          messages: ['You Are Now Logged In'],
          dismissible: true, timeout: 3000, type: 'success'
          });
        this.router.navigate(['/profile']);
        console.log(res.msg, res.user);
        } else {
          this.flashMessage.showFlashMessage({
            messages: ['Check Login Credentials,User Name or password mismatch'],
          dismissible: true, timeout: 5000, type: 'danger'
          });
          this.router.navigate(['/account/login']);
        }
      },
      err => {
        console.log('Error Occured');
        this.flashMessage.showFlashMessage({
          messages: ['Something Went Wrong'],
          dismissible: true, timeout: 3000, type: 'danger'
          });
        this.router.navigate(['/account']);
     });
    console.log(this.user)

  }

}
