import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPayRequestDetailPage } from './new-pay-request-detail';

@NgModule({
  declarations: [
    NewPayRequestDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPayRequestDetailPage),
  ],
})
export class NewPayRequestDetailPageModule {}
