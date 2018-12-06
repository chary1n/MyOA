import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateVacationPage } from './create-vacation';

@NgModule({
  declarations: [
    CreateVacationPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateVacationPage),
  ],
})
export class CreateVacationPageModule {}
