import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEmployeeInfoPage } from './edit-employee-info';

@NgModule({
  declarations: [
    EditEmployeeInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEmployeeInfoPage),
  ],
})
export class EditEmployeeInfoPageModule {}
