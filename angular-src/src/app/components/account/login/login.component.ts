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
  accountType:String="User";
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
    accountType:String;
  };
  onLoginSubmit(){
    console.log(this.accountType)
    this.user = this.loginForm.value;
    this.user.accountType = this.accountType;
    var url;
    if(this.accountType === 'Admin') url = 'http://localhost:3000/admin/authenticate';
    if(this.accountType === 'Supplier') url = 'http://localhost:3000/supplier/authenticate';
    else if (this.accountType === 'User') url = 'http://localhost:3000/users/authenticate';
    const req = this.http.post<Res>(url, this.user).subscribe(
      res => {
        // console.log(res.success,res.msg);
        if (res.success) {
          this.authService.storeUserData(res.msg, res.user);
          this.flashMessage.showFlashMessage({
          messages: ['You Are Now Logged In'],
          dismissible: true, timeout: 3000, type: 'success'
          });
          if(this.accountType === 'User') this.router.navigate(['/profile']);
          else if(this.accountType === 'Admin') this.router.navigate(['/admin']);
          else if(this.accountType === 'Supplier') this.router.navigate(['/supplier']);
        //console.log(res.msg, res.user);
        } else {
          this.flashMessage.showFlashMessage({
            messages: ['Check Login Credentials,User Name or password mismatch'],
          dismissible: true, timeout: 5000, type: 'danger'
          });
          this.router.navigate(['/account/login']);
        }
      },
      err => {
        // console.log('Error Occured');
        this.flashMessage.showFlashMessage({
          messages: ['Something Went Wrong'],
          dismissible: true, timeout: 3000, type: 'danger'
          });
        this.router.navigate(['/account/login']);
     });
    // console.log(this.user)

  }

}
