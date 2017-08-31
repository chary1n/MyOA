import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarehouseMovePage } from './warehouse-move';

@NgModule({
  declarations: [
    WarehouseMovePage,
  ],
  imports: [
    IonicPageModule.forChild(WarehouseMovePage),
  ],
  exports: [
    WarehouseMovePage
  ]
})
export class WarehouseMovePageModule {}
