
import { HttpService } from './../../providers/HttpService';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';



@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
   HttpModule
  ],
  exports: [
    LoginPage
  ],
  providers :[
    
  ]

})
export class LoginPageModule {}
