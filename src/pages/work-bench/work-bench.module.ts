import { OrderPage } from './order/order';
import { InspectionDetailPage } from './inspection-detail/inspection-detail';
import { CardinfoPage } from './cardinfo/cardinfo';
import { IncomingPage} from './incoming/incoming';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkBenchPage } from './work-bench';
import { IncomingDetailPage} from './incoming-detail/incoming-detail';
import { SupplierListPage } from './supplier-list/supplier-list';
import { SupplierDetailPage } from './supplier-detail/supplier-detail';
import { ContactListPage } from './contact-list/contact-list';

@NgModule({
  declarations: [
    WorkBenchPage,CardinfoPage,IncomingPage,IncomingDetailPage,InspectionDetailPage,SupplierListPage,SupplierDetailPage
    ,ContactListPage,OrderPage
  ],
  imports: [
    IonicPageModule.forChild(WorkBenchPage),
  ],
  entryComponents:[ WorkBenchPage,CardinfoPage,IncomingPage,IncomingDetailPage,
    InspectionDetailPage,SupplierListPage,SupplierDetailPage,OrderPage,ContactListPage],
  exports: [
    WorkBenchPage
  ]
})
export class WorkBenchPageModule {}
