import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProductDetailPageN } from './new-product-detail';

@NgModule({
  declarations: [
    NewProductDetailPageN,
  ],
  imports: [
    IonicPageModule.forChild(NewProductDetailPageN),
  ],
})
export class NewProductDetailPageModule {}
