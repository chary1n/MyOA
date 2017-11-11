import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShengouItemPage } from './shengou-item';

@NgModule({
  declarations: [
    ShengouItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ShengouItemPage),
  ],
})
export class ShengouItemPageModule {}
