import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacationApprovalPage } from './vacation-approval';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    VacationApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(VacationApprovalPage),AutoCompleteModule
  ],
})
export class VacationApprovalPageModule {}
