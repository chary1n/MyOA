import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseDepartmentPage } from './choose-department';

@NgModule({
  declarations: [
    ChooseDepartmentPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseDepartmentPage),
  ],
})
export class ChooseDepartmentPageModule {}
