import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMaterialRequestPage } from './edit-material-request';

@NgModule({
  declarations: [
    EditMaterialRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMaterialRequestPage),
  ],
})
export class EditMaterialRequestPageModule {}
