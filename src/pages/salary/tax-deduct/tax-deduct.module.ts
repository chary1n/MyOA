import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxDeductPage } from './tax-deduct';

@NgModule({
  declarations: [
    TaxDeductPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxDeductPage),
  ],
})
export class TaxDeductPageModule {}
