import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionDetailPage } from './production-detail';

@NgModule({
  declarations: [
    ProductionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionDetailPage),
  ],
  exports: [
    ProductionDetailPage
  ]
})
export class ProductionDetailPageModule {}
