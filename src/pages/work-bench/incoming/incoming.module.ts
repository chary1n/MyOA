import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomingPage } from './incoming';

@NgModule({
  declarations: [
    IncomingPage,
  ],
  imports: [
    IonicPageModule.forChild(IncomingPage),
  ],
  exports: [
    IncomingPage
  ]
})
export class IncomingPageModule {}
