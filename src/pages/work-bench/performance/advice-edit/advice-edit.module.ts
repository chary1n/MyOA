import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdviceEditPage } from './advice-edit';

@NgModule({
  declarations: [
    AdviceEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AdviceEditPage),
  ],
})
export class AdviceEditPageModule {}
