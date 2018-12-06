import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditVacationDetailPage } from './edit-vacation-detail';

@NgModule({
  declarations: [
    EditVacationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EditVacationDetailPage),
  ],
})
export class EditVacationDetailPageModule {}
