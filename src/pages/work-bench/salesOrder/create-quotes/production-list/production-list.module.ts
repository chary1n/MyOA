import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionListPage } from './production-list';

@NgModule({
  declarations: [
    ProductionListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionListPage),
  ],
  exports: [
    ProductionListPage
  ]
})
export class ProductionListPageModule {}
