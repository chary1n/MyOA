import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMeInfoPage } from './edit-me-info';

@NgModule({
  declarations: [
    EditMeInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMeInfoPage),
  ],
})
export class EditMeInfoPageModule {}
