import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalarySubsidyDetailPage } from './salary-subsidy-detail';

@NgModule({
  declarations: [
    SalarySubsidyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SalarySubsidyDetailPage),
  ],
})
export class SalarySubsidyDetailPageModule {}
