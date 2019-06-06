import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntpDetailPage } from './intp-detail';

@NgModule({
  declarations: [
    IntpDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(IntpDetailPage),
  ],
})
export class IntpDetailPageModule {}
