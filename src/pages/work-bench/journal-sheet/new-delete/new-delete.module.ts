import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDeletePage } from './new-delete';

@NgModule({
  declarations: [
    NewDeletePage,
  ],
  imports: [
    IonicPageModule.forChild(NewDeletePage),
  ],
})
export class NewDeletePageModule {}
