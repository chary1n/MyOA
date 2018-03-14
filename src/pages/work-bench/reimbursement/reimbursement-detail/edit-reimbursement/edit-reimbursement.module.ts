import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditReimbursementPage } from './edit-reimbursement';

@NgModule({
  declarations: [
    EditReimbursementPage,
  ],
  imports: [
    IonicPageModule.forChild(EditReimbursementPage),
  ],
})
export class EditReimbursementPageModule {}
