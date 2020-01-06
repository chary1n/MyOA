import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryAllowanceDetailPage } from './salary-allowance-detail';

@NgModule({
  declarations: [
    SalaryAllowanceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryAllowanceDetailPage),
  ],
})
export class SalaryAllowanceDetailPageModule {}
