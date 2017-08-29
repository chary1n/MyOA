import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BomPage } from './bom';

@NgModule({
  declarations: [
    BomPage,
  ],
  imports: [
    IonicPageModule.forChild(BomPage),
  ],
  exports: [
    BomPage
  ]
})
export class BomPageModule {}
