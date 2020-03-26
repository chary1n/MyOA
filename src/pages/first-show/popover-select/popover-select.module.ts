import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverSelectPage } from './popover-select';

@NgModule({
  declarations: [
    PopoverSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverSelectPage),
  ],
  exports: [
    PopoverSelectPage
  ]
})
export class PopoverSelectPageModule {}
