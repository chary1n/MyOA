import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleDetailPopoverPage } from './sale-detail-popover';

@NgModule({
  declarations: [
    SaleDetailPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleDetailPopoverPage),
  ],
})
export class SaleDetailPopoverPageModule {}
