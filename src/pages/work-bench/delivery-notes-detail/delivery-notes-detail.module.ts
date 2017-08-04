import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryNotesDetailPage } from './delivery-notes-detail';

@NgModule({
  declarations: [
    DeliveryNotesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryNotesDetailPage),
  ],
  exports: [
    DeliveryNotesDetailPage
  ]
})
export class DeliveryNotesDetailPageModule {}
