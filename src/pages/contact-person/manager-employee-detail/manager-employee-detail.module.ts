import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerEmployeeDetailPage } from './manager-employee-detail';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    ManagerEmployeeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerEmployeeDetailPage),IonicImageViewerModule
  ],
})
export class ManagerEmployeeDetailPageModule {}
