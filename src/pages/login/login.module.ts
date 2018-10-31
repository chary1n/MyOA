
// import { HttpService } from './../../providers/HttpService';
import { HttpModule } from '@angular/http';
// import { Http } from '@angular/http';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AutoCompleteModule } from 'ionic2-auto-complete';



@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),AutoCompleteModule,
   HttpModule
  ],
  exports: [
    LoginPage
  ],
  providers :[
    
  ]

})
export class LoginPageModule {}
