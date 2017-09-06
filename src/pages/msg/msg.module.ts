import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgPage } from './msg';
@NgModule({
  declarations: [
    MsgPage
  ],
  imports: [
    IonicPageModule.forChild(MsgPage),
  ],
  exports: [
    MsgPage
  ],
  entryComponents: [MsgPage],
})
export class MsgPageModule {}
