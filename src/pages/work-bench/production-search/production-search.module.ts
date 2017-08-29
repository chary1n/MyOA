import { ProductionDetailPage } from './production-detail/production-detail';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionSearchPage } from './production-search';

@NgModule({
  declarations: [
    ProductionSearchPage,ProductionDetailPage
  ],
  imports: [
    IonicPageModule.forChild(ProductionSearchPage),
  ],
  entryComponents :[ProductionDetailPage],
  exports: [
    ProductionSearchPage,
  ]
})
export class ProductionSearchPageModule {}
