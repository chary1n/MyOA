import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImproveQuotationPage } from './improve-quotation';

@NgModule({
  declarations: [
    ImproveQuotationPage,
  ],
  imports: [
    IonicPageModule.forChild(ImproveQuotationPage),
  ],
  exports: [
    ImproveQuotationPage
  ]
})
export class ImproveQuotationPageModule {}
