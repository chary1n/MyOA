import { DeliveryInitialRequestPage } from './delivery-initial-request/delivery-initial-request';
import { DeliveryExtraPage } from './delivery-extra/delivery-extra';
import { DeliveryPage } from './delivery/delivery';
import { OrderDetailPage } from './order-detail/order-detail';
import { ReturnOrderDetailPage } from './return-order-detail/return-order-detail';
import { OrderPage } from './order/order';
import { InspectionDetailPage } from './inspection-detail/inspection-detail';
import { CardinfoPage } from './cardinfo/cardinfo';
import { IncomingPage } from './incoming/incoming';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkBenchPage } from './work-bench';
import { IncomingDetailPage } from './incoming-detail/incoming-detail';
import { SupplierListPage } from './supplier-list/supplier-list';
import { SupplierDetailPage } from './supplier-detail/supplier-detail';
import { ContactListPage } from './contact-list/contact-list';
import { PopoverPage} from './order-detail/order-detail'
import { PoContactPage } from './po-contact/po-contact';
import { ReturnPopoverPage} from './return-order-detail/return-order-detail'
import { DeliveryNotesPage } from './delivery-notes/delivery-notes';
import { DeliveryNotesDetailPage } from './delivery-notes-detail/delivery-notes-detail';
import { CustomerPage } from './../customer/customer';
@NgModule({
  declarations: [
    WorkBenchPage,CardinfoPage,IncomingPage,IncomingDetailPage,InspectionDetailPage,SupplierListPage,SupplierDetailPage
    ,ContactListPage,OrderPage,ReturnOrderDetailPage,OrderDetailPage,PopoverPage,PoContactPage,ReturnPopoverPage
    ,DeliveryPage,DeliveryExtraPage,DeliveryInitialRequestPage,DeliveryNotesPage,DeliveryNotesDetailPage,CustomerPage
  ],
  imports: [
    IonicPageModule.forChild(WorkBenchPage),
  ],
  entryComponents:[ WorkBenchPage,CardinfoPage,IncomingPage,IncomingDetailPage,
    InspectionDetailPage,SupplierListPage,SupplierDetailPage,OrderPage,ContactListPage,ReturnOrderDetailPage,OrderDetailPage,PopoverPage,PoContactPage,ReturnPopoverPage
     ,DeliveryPage,DeliveryExtraPage,DeliveryInitialRequestPage,DeliveryNotesPage,DeliveryNotesDetailPage,CustomerPage],
  exports: [
    WorkBenchPage
  ]
})
export class WorkBenchPageModule { }
