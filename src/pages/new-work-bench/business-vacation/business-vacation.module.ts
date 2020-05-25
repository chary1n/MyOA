import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessVacationPage } from './business-vacation';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    BusinessVacationPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessVacationPage),AutoCompleteModule
  ],
})
export class BusinessVacationPageModule {}
