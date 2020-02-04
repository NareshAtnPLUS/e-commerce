import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
export interface Res{
  success:boolean,
  user:string,
  msg:string
}

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpForm = this.fb.group({
    otp:['',Validators.minLength(6)],
  })
  otp:{
    otp:String,
    userName:string
  }
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private authService:AuthService,
    private flashMessage:NgFlashMessageService,
    private router:Router,
    ) { }

  ngOnInit() {
  }
  onOtpSubmit(){
    this.otp = this.otpForm.value
    this.otp.userName = this.authService.getUpdateToken()
    // console.log(this.otp)
    const req = this.http.post<Res>('http://localhost:3000/users/verify-otp', this.otp).subscribe(
      res => {
        // console.log(res);
        if (res.success) {
          this.authService.storeUserData(res.msg, res.user);
          this.flashMessage.showFlashMessage({
          messages: ['OTP verification sucessfull!'],
          dismissible: true, timeout: 3000, type: 'success'
          });
        this.router.navigate(['/account/forgot-password/update-password']);
        // console.log(res.msg, res.user);
        } else {
          this.flashMessage.showFlashMessage({
            messages: ['Username does not exists!,Please register yourself as a valid User'],
          dismissible: true, timeout: 5000, type: 'danger'
          });
          this.router.navigate(['/account/register']);
        }
      },
      err => {
        // console.log('Error Occured');
        this.flashMessage.showFlashMessage({
          messages: ['Something Went Wrong'],
          dismissible: true, timeout: 3000, type: 'danger'
          });
        this.router.navigate(['/account/register']);
     });
  }

}
