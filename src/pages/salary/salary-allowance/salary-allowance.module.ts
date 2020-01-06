import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryAllowancePage } from './salary-allowance';

@NgModule({
  declarations: [
    SalaryAllowancePage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryAllowancePage),
  ],
})
export class SalaryAllowancePageModule {}
