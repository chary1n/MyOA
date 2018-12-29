import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxApplyDetailPage } from './tax-apply-detail';

@NgModule({
  declarations: [
    TaxApplyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxApplyDetailPage),
  ],
})
export class TaxApplyDetailPageModule {}
