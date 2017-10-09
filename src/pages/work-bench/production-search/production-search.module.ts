import { WarehouseMovePage } from './production-detail/warehouse-move/warehouse-move';
import { BomPage } from './production-detail/bom/bom';
import { ProductionDetailPage } from './production-detail/production-detail';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionSearchPage } from './production-search';

@NgModule({
  declarations: [
    ProductionSearchPage,
    // ProductionDetailPage,BomPage,WarehouseMovePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionSearchPage)
  ],
  entryComponents :[
    // ProductionDetailPage,
  // BomPage,WarehouseMovePage,
  ],
  exports: [
    ProductionSearchPage,
  ]
})
export class ProductionSearchPageModule {}
