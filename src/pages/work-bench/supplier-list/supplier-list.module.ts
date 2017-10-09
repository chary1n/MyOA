import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierListPage } from './supplier-list';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    SupplierListPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplierListPage),AutoCompleteModule
  ],
  exports: [
    SupplierListPage
  ]
})
export class SupplierListPageModule {}