import { IonicImageViewerModule } from 'ionic-img-viewer';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEmployeePage } from './add-employee';

@NgModule({
  declarations: [
    AddEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(AddEmployeePage),IonicImageViewerModule
  ],
})
export class AddEmployeePageModule {}
