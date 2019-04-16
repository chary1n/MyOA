import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectDepartmentPage } from './select-department';

@NgModule({
  declarations: [
    SelectDepartmentPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectDepartmentPage),
  ],
})
export class SelectDepartmentPageModule {}
