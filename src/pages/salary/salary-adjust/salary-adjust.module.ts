import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryAdjustPage } from './salary-adjust';

@NgModule({
  declarations: [
    SalaryAdjustPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryAdjustPage),
  ],
})
export class SalaryAdjustPageModule {}
