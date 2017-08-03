import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoContactPage } from './po-contact';

@NgModule({
  declarations: [
    PoContactPage,
  ],
  imports: [
    IonicPageModule.forChild(PoContactPage),
  ],
  exports: [
    PoContactPage
  ]
})
export class PoContactPageModule {}
