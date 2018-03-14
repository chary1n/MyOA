import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProductListPage } from './new-product-list';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    NewProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProductListPage),AutoCompleteModule,
  ],
})
export class NewProductListPageModule {}
