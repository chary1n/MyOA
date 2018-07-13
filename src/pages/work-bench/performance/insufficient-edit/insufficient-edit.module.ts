import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsufficientEditPage } from './insufficient-edit';

@NgModule({
  declarations: [
    InsufficientEditPage,
  ],
  imports: [
    IonicPageModule.forChild(InsufficientEditPage),
  ],
})
export class InsufficientEditPageModule {}
