import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProductionPage } from './add-production';

@NgModule({
  declarations: [
    AddProductionPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProductionPage),
  ],
  exports: [
    AddProductionPage
  ]
})
export class AddProductionPageModule {}
