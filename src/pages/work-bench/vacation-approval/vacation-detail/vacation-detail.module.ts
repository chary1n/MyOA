import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacationDetailPage } from './vacation-detail';

@NgModule({
  declarations: [
    VacationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VacationDetailPage),
  ],
})
export class VacationDetailPageModule {}
