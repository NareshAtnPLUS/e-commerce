import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
interface Res{
  success:boolean,
  msg:string,
}
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm = this.fb.group({
    password:['',Validators.minLength(8)],
    confirmPassword:['',Validators.minLength(8)],
  })
  constructor(
    private fb:FormBuilder,
    private registerService:RegisterService,
    private http:HttpClient,
    private authService:AuthService,
    private flashMessage:NgFlashMessageService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  user:{
    userName:String;
    password:Object;
  }
  onUpdateSubmit(){
    if(this.registerService.validateUpdatePassword(this.updatePasswordForm.value)){
      // console.log(this.updatePasswordForm.value);
      
      //this.user.password = this.updatePasswordForm.value;
      this.user = {
        userName: this.authService.getUpdateToken(),
        password:this.updatePasswordForm.value,
      }
      // console.log(this.user)
      const req = this.http.post<Res>('http://localhost:3000/users/update-password', this.user).subscribe(
      res => {
        if (res.success) {
          this.flashMessage.showFlashMessage({
          messages: [res.msg],
          dismissible: true, timeout: 3000, type: 'success'
          });
        this.router.navigate(['/account/login']);
        } else {
          this.flashMessage.showFlashMessage({
            messages: [res.msg],
          dismissible: true, timeout: 5000, type: 'danger'
          });
          this.router.navigate(['/account/forgot-password/update-password']);
        }
      },
      err => {

        this.flashMessage.showFlashMessage({
          messages: ['Something Went Wrong'],
          dismissible: true, timeout: 3000, type: 'danger'
          });
        this.router.navigate(['/account/register']);
     });
      
    }
  }

}
