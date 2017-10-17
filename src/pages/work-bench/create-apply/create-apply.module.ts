import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateApplyPage } from './create-apply';

@NgModule({
  declarations: [
    CreateApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateApplyPage),
  ],
})
export class CreateApplyPageModule {}
