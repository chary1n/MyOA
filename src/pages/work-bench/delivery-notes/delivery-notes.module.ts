import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryNotesPage } from './delivery-notes';

@NgModule({
  declarations: [
    DeliveryNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryNotesPage),
  ],
  exports: [
    DeliveryNotesPage
  ]
})
export class DeliveryNotesPageModule {}
