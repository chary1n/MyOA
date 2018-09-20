import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceUpdatePage } from './attendance-update';

@NgModule({
  declarations: [
    AttendanceUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceUpdatePage),
  ],
})
export class AttendanceUpdatePageModule {}
