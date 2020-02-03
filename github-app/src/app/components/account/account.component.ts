import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent  {
  colorToggle={
    value:'accent'
  }
  backgroundColorToggle ={
    value:'accent'
  }
  
  
  constructor() { }

  

}
