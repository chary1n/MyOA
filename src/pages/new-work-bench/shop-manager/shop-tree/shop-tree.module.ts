import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopTreePage } from './shop-tree';

@NgModule({
  declarations: [
    ShopTreePage,
  ],
  imports: [
    IonicPageModule.forChild(ShopTreePage),
  ],
})
export class ShopTreePageModule {}
