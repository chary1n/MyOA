import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryAdjustDetailPage } from './salary-adjust-detail';

@NgModule({
  declarations: [
    SalaryAdjustDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryAdjustDetailPage),
  ],
})
export class SalaryAdjustDetailPageModule {}
