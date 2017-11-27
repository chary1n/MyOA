import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShenheMaterialRequestPage } from './shenhe-material-request';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ShenheMaterialRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ShenheMaterialRequestPage),AutoCompleteModule
  ],
})
export class ShenheMaterialRequestPageModule {}
