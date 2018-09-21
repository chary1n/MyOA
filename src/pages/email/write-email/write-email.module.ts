import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteEmailPage } from './write-email';


@NgModule({
  declarations: [
    WriteEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(WriteEmailPage),
  ],
})
export class WriteEmailPageModule {}
