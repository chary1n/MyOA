import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipPage } from './tip';

@NgModule({
  declarations: [
    TipPage,
  ],
  imports: [
    IonicPageModule.forChild(TipPage),
  ],
})
export class TipPageModule {}
