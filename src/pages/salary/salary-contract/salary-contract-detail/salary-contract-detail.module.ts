import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryContractDetailPage } from './salary-contract-detail';

@NgModule({
  declarations: [
    SalaryContractDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryContractDetailPage),
  ],
})
export class SalaryContractDetailPageModule {}
