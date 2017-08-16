import { ProductionListPage } from './create-quotes/production-list/production-list';
import { AddProductionPage } from './create-quotes/add-production/add-production';
import { ImproveQuotationPage } from './create-quotes/improve-quotation/improve-quotation';
import { CreateQuotesPage } from './create-quotes/create-quotes';
import { DeliveryPage } from './sales-detail/delivery/delivery';
import { PopoverPage } from './sales-detail/sales-detail';
import { SalesOrderPage } from './salesOrder';
import { SalesDetailPage } from './sales-detail/sales-detail';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SalesOrderPage,SalesDetailPage,PopoverPage,DeliveryPage,CreateQuotesPage,ImproveQuotationPage
    ,AddProductionPage,ProductionListPage
  ],
  imports: [
    IonicPageModule.forChild(SalesOrderPage),
  ],
  entryComponents:[SalesDetailPage,PopoverPage,DeliveryPage,CreateQuotesPage,ImproveQuotationPage
  ,AddProductionPage,ProductionListPage
  ],
  exports: [
    SalesOrderPage,
  ]
})
export class SalesOrderPageModule {}
