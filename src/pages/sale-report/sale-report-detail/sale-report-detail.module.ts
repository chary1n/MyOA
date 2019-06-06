import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleReportDetailPage } from './sale-report-detail';

@NgModule({
  declarations: [
    SaleReportDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleReportDetailPage),
  ],
})
export class SaleReportDetailPageModule {}
