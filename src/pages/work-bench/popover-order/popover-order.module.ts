import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverOrderPage } from './popover-order';

@NgModule({
  declarations: [
    PopoverOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverOrderPage),
  ],
  exports: [
    PopoverOrderPage
  ]
})
export class PopoverOrderPageModule {}
