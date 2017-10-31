import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReimbursementPage } from './reimbursement';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ReimbursementPage,
  ],
  imports: [
    IonicPageModule.forChild(ReimbursementPage),AutoCompleteModule,
  ],
})
export class ReimbursementPageModule {}
