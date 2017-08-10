import { SalesDetailPage } from './sales-detail/sales-detail';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesPage } from './sales';

@NgModule({
  declarations: [
    SalesPage,SalesDetailPage
  ],
  imports: [
    IonicPageModule.forChild(SalesPage),
  ],
  exports: [
    SalesPage,SalesDetailPage
  ]
})
export class SalesPageModule {}
