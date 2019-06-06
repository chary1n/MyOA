import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopManagerPage } from './shop-manager';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    ShopManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopManagerPage),AutoCompleteModule
  ],
})
export class ShopManagerPageModule {}
