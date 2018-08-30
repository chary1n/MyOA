import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceRecoupDetailEditPage } from './attendance-recoup-detail-edit';

@NgModule({
  declarations: [
    AttendanceRecoupDetailEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceRecoupDetailEditPage),
  ],
})
export class AttendanceRecoupDetailEditPageModule {}
