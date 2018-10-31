import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewReimbursementPage } from './new-reimbursement';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    NewReimbursementPage,
  ],
  imports: [
    IonicPageModule.forChild(NewReimbursementPage),AutoCompleteModule
  ],
})
export class NewReimbursementPageModule {}
