import { InspectionDetailPage } from './inspection-detail/inspection-detail';
import { CardinfoPage } from './cardinfo/cardinfo';
import { IncomingPage} from './incoming/incoming';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkBenchPage } from './work-bench';
import { IncomingDetailPage} from './incoming-detail/incoming-detail';
import { SupplierListPage } from './supplier-list/supplier-list';

@NgModule({
  declarations: [
    WorkBenchPage,CardinfoPage,IncomingPage,IncomingDetailPage,InspectionDetailPage,SupplierListPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkBenchPage),
  ],
  entryComponents:[ WorkBenchPage,CardinfoPage,IncomingPage,IncomingDetailPage,InspectionDetailPage,SupplierListPage],
  exports: [
    WorkBenchPage
  ]
})
export class WorkBenchPageModule {}
