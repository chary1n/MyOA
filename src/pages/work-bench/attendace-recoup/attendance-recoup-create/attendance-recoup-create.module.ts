import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceRecoupCreatePage } from './attendance-recoup-create';

@NgModule({
  declarations: [
    AttendanceRecoupCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceRecoupCreatePage),
  ],
})
export class AttendanceRecoupCreatePageModule {}
