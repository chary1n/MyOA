import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryContractPage } from './salary-contract';

@NgModule({
  declarations: [
    SalaryContractPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryContractPage),
  ],
})
export class SalaryContractPageModule {}
