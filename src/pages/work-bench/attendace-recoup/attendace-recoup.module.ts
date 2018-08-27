import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendaceRecoupPage } from './attendace-recoup';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    AttendaceRecoupPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendaceRecoupPage),AutoCompleteModule
  ],
})
export class AttendaceRecoupPageModule {}
