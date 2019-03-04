import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMomentsPage } from './create-moments';

@NgModule({
  declarations: [
    CreateMomentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateMomentsPage),
  ],
})
export class CreateMomentsPageModule {}
