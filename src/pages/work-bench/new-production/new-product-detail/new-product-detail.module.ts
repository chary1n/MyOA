import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProductDetailPage } from './new-product-detail';

@NgModule({
  declarations: [
    NewProductDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProductDetailPage),
  ],
})
export class NewProductDetailPageModule {}
