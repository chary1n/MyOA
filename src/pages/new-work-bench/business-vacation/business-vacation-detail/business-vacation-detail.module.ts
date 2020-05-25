import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessVacationDetailPage } from './business-vacation-detail';

@NgModule({
  declarations: [
    BusinessVacationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessVacationDetailPage),
  ],
})
export class BusinessVacationDetailPageModule {}
