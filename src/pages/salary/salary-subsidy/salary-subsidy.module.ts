import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalarySubsidyPage } from './salary-subsidy';

@NgModule({
  declarations: [
    SalarySubsidyPage,
  ],
  imports: [
    IonicPageModule.forChild(SalarySubsidyPage),
  ],
})
export class SalarySubsidyPageModule {}
