import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReturnProductDetailPage } from './return-product-detail';

@NgModule({
  declarations: [
    ReturnProductDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReturnProductDetailPage),
  ],
})
export class ReturnProductDetailPageModule {}
