import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { MaterialModule } from './theme/material/material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RegisterService } from './services/register.service';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { GithubService } from './services/github.service';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { OtpComponent } from './components/account/forgot-password/otp/otp.component';
import { UpdatePasswordComponent } from './components/account/forgot-password/update-password/update-password.component';
import { OfferComponent } from './components/offer/offer.component';
import { AdminComponent } from './components/admin/admin.component';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    AccountComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    OtpComponent,
    UpdatePasswordComponent,
    OfferComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    NgFlashMessagesModule.forRoot()
  ],
  providers: [
    RegisterService,
    AuthService,
    AuthGuard,
    GithubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
