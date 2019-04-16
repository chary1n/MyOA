import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerEmployeeDetailPage } from './manager-employee-detail';

@NgModule({
  declarations: [
    ManagerEmployeeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerEmployeeDetailPage),
  ],
})
export class ManagerEmployeeDetailPageModule {}
