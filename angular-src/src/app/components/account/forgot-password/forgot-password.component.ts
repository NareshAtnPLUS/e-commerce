import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
export interface Res{
  success: boolean;
  user: string;
  token:  Object;
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm = this.fb.group({
    userName:['',Validators.minLength(4)],
  })
  user:{
    userName:string;
  }
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private authService:AuthService,
    private flashMessage:NgFlashMessageService,
    private router:Router,
    ) { }

  
  onForgotSubmit(){
    this.user = this.forgotForm.value;
    const req = this.http.post<Res>('http://localhost:3000/users/request-otp', this.user).subscribe(
      res => {
        console.log(res.success);
        if (res.success) {
          this.authService.sendTokenUpdatePassword(res.user);
          this.flashMessage.showFlashMessage({
          messages: ['Username exists enter OTP!'],
          dismissible: true, timeout: 3000, type: 'success'
          });
        this.router.navigate(['/account/forgot-password/otp']);
        console.log(res.token, res.user);
        } else {
          this.flashMessage.showFlashMessage({
            messages: ['Username does not exists!,Please register yourself as a valid User'],
          dismissible: true, timeout: 5000, type: 'danger'
          });
          this.router.navigate(['/account/register']);
        }
      },
      err => {
        console.log('Error Occured');
        this.flashMessage.showFlashMessage({
          messages: ['Something Went Wrong'],
          dismissible: true, timeout: 3000, type: 'danger'
          });
        this.router.navigate(['/account/register']);
     });
  }

}
