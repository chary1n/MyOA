import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitDetailPage } from './visit-detail';

@NgModule({
  declarations: [
    VisitDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitDetailPage),
  ],
})
export class VisitDetailPageModule {}
