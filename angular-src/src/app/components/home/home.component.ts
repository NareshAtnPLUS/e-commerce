import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpHandlerService } from 'src/app/services/http-handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  products:any = [];
  constructor(
    private httpHandler:HttpHandlerService,
    private authService:AuthService,
    private router:Router
  ) { 
    this.httpHandler.mobilesHandler().subscribe((data:{}) => {
      this.products = data
      console.log(this.products.mobile[0].variants,this.products.mobile[0]._id)
    })
  }
  ngAfterViewInit(): void {
      
  }
  onBuySubmit(product){
    this.authService.storeProuductData(product);
    this.router.navigate(['/buy-product'])
  }

}
